import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative overflow-hidden rounded-3xl bg-black p-10 text-white dark:bg-primary">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="max-w-2xl space-y-3">
          <h3 class="font-heading text-3xl font-semibold">{{ title }}</h3>
          <p class="text-base text-white/80" *ngIf="subtitle">
            {{ subtitle }}
          </p>
        </div>
        <a
          class="btn-primary bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-black/80"
          [routerLink]="ctaLink"
        >
          {{ ctaText }}
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaBannerComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() ctaText = 'Fale connosco';
  @Input() ctaLink = '/contact';
}

