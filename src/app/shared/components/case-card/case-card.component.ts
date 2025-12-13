import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaseStudy } from '@app/core/models/case.model';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-case-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe],
  template: `
    <article
      class="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-elevated dark:border-white/10 dark:bg-zinc-900"
    >
      <figure class="relative aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
        <img
          [src]="caseStudy.cover"
          [alt]="caseStudy.title"
          class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </figure>

      <div class="flex flex-1 flex-col gap-4 p-6">
        <div class="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-primary/70">
          <span
            *ngFor="let tag of caseStudy.tags"
            class="rounded-full border border-primary/80 bg-primary/70 px-3 py-1 text-[0.65rem] tracking-[0.25em] text-white dark:border-primary/70 dark:bg-primary/50 dark:text-white"
          >
            {{ tag }}
          </span>
        </div>
        <h3 class="font-heading text-xl font-semibold">
          {{ caseStudy.title }}
        </h3>
        <p class="text-sm text-black/70 dark:text-white/70">
          {{ caseStudy.summary | truncate:140 }}
        </p>
        <div class="mt-auto">
          <a
            [routerLink]="['/cases', caseStudy.slug]"
            class="inline-flex items-center gap-2 font-medium text-primary transition hover:gap-3"
            [attr.aria-label]="'Ver detalhes do case ' + caseStudy.title"
          >
            Ver case
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseCardComponent {
  @Input({ required: true }) caseStudy!: CaseStudy;
}

