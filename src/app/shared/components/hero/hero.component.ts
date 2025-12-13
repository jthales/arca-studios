import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface HeroAction {
  label: string;
  link: string;
  external?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section
      class="relative overflow-hidden"
      [ngClass]="{
        'bg-black text-white': variant === 'dark',
        'bg-primary text-white': variant === 'accent',
        'bg-white text-black': variant === 'light'
      }"
    >
      <div class="container mx-auto flex flex-col gap-6 py-24">
        <p *ngIf="eyebrow" class="text-xs uppercase tracking-[0.4em] text-white/70 dark:text-white/80">
          {{ eyebrow }}
        </p>
        <h1 class="font-heading text-4xl font-semibold tracking-tight md:text-6xl">
          {{ title }}
        </h1>
        <p
          class="max-w-2xl text-lg md:text-xl"
          [ngClass]="variant === 'light' ? 'text-black/70' : 'text-white/90'"
          *ngIf="subtitle"
        >
          {{ subtitle }}
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <a
            *ngIf="primaryCta"
            [routerLink]="!primaryCta.external ? primaryCta.link : null"
            [href]="primaryCta.external ? primaryCta.link : null"
            class="btn-primary"
            [attr.target]="primaryCta.external ? '_blank' : null"
            [attr.rel]="primaryCta.external ? 'noopener noreferrer' : null"
          >
            {{ primaryCta.label }}
          </a>

          <a
            *ngIf="secondaryCta"
            [routerLink]="!secondaryCta.external ? secondaryCta.link : null"
            [href]="secondaryCta.external ? secondaryCta.link : null"
            class="btn-secondary"
            [attr.target]="secondaryCta.external ? '_blank' : null"
            [attr.rel]="secondaryCta.external ? 'noopener noreferrer' : null"
          >
            {{ secondaryCta.label }}
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() eyebrow?: string;
  @Input() primaryCta?: HeroAction;
  @Input() secondaryCta?: HeroAction;
  @Input() variant: 'light' | 'dark' | 'accent' = 'light';
}

