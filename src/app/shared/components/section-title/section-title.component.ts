import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <p *ngIf="eyebrow" class="text-xs uppercase tracking-[0.4em] text-primary/80">
        {{ eyebrow }}
      </p>
      <h2 class="font-heading text-3xl font-semibold md:text-4xl">
        {{ title }}
      </h2>
      <p *ngIf="subtitle" class="max-w-2xl text-base text-black/70 dark:text-white/70 pb-4">
        {{ subtitle }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() eyebrow?: string;
}

