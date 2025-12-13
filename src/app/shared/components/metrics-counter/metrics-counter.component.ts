import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';
import { formatMetricValue } from '@app/core/utils/formatters';
import { prefersReducedMotion } from '@app/core/utils/a11y';

@Component({
  selector: 'app-metrics-counter',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <div
      class="flex h-full flex-col justify-between rounded-3xl border border-black/5 bg-white p-6 text-center shadow-sm transition dark:border-white/10 dark:bg-zinc-900"
      (appInView)="onVisibilityChange($event)"
      appInView
    >
      <p class="text-sm uppercase tracking-[0.3em] text-primary/70">{{ label }}</p>
      <p class="mt-4 font-heading text-4xl font-semibold md:text-5xl">
        {{ animatedValue() }}
      </p>
      <p class="mt-3 text-sm text-black/70 dark:text-white/70">
        {{ description }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsCounterComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string;
  @Input() description = '';

  private readonly animatedValueSignal = signal(this.value);
  private hasAnimated = false;

  animatedValue = this.animatedValueSignal.asReadonly();

  onVisibilityChange(isVisible: boolean): void {
    if (!isVisible || this.hasAnimated) {
      return;
    }
    this.startAnimation();
  }

  private startAnimation(): void {
    if (prefersReducedMotion()) {
      this.animatedValueSignal.set(this.value);
      this.hasAnimated = true;
      return;
    }

    const plainValue = this.value.trim();
    if (!/^[+]?[\d.,]+%?$/.test(plainValue)) {
      this.animatedValueSignal.set(this.value);
      return;
    }

    const numeric = Number.parseFloat(plainValue.replace(/[^\d.-]/g, ''));
    if (Number.isNaN(numeric)) {
      this.animatedValueSignal.set(this.value);
      return;
    }

    const isPercentage = this.value.trim().includes('%');
    const isPositive = this.value.trim().startsWith('+');
    const duration = 1200;
    const start = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numeric * eased;
      const formatted = formatMetricValue(
        isPercentage ? `${isPositive ? '+' : ''}${currentValue.toFixed(1)}%` : currentValue
      );
      this.animatedValueSignal.set(formatted);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.animatedValueSignal.set(this.value);
      }
    };

    requestAnimationFrame(step);
    this.hasAnimated = true;
  }
}

