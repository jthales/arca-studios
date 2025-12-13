import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '@app/core/services/content.service';
import { SeoService } from '@app/core/services/seo.service';
import { CaseStudy } from '@app/core/models/case.model';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="caseStudy() as selectedCase; else notFound">
      <section class="relative overflow-hidden bg-black py-24 text-white dark:bg-primary">
        <div class="container space-y-6">
          <p class="text-xs uppercase tracking-[0.4em] text-white/60">
            {{ selectedCase.tags.join(' • ') }}
          </p>
          <h1 class="font-heading text-4xl font-semibold md:text-6xl">
            {{ selectedCase.title }}
          </h1>
          <p class="max-w-2xl text-lg text-white/80">
            {{ selectedCase.summary }}
          </p>
        </div>
      </section>

      <section class="container space-y-16 py-16">
        <div class="grid gap-10 lg:grid-cols-[2fr,3fr]">
          <div class="space-y-6">
            <h2 class="font-heading text-2xl font-semibold">Desafio</h2>
            <p class="text-base text-black/70 dark:text-white/70">
              {{ selectedCase.challenge }}
            </p>
          </div>
          <div class="space-y-6">
            <h2 class="font-heading text-2xl font-semibold">Estratégia</h2>
            <ul class="space-y-4 text-base text-black/70 dark:text-white/70">
              <li *ngFor="let item of selectedCase.strategy">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="font-heading text-2xl font-semibold">Resultados</h2>
          <ul class="grid gap-4 md:grid-cols-2">
            <li
              *ngFor="let result of selectedCase.results"
              class="rounded-3xl border border-black/10 bg-white/80 p-6 text-sm shadow-sm dark:border-white/10 dark:bg-black/40"
            >
              {{ result }}
            </li>
          </ul>
        </div>

        <div class="space-y-6" *ngIf="selectedCase.metrics?.length">
          <h2 class="font-heading text-2xl font-semibold">Métricas</h2>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              *ngFor="let metric of selectedCase.metrics"
              class="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-black/50"
            >
              <p class="font-heading text-3xl font-semibold">{{ metric.value }}</p>
              <p class="mt-2 text-sm text-black/60 dark:text-white/60">{{ metric.label }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="font-heading text-2xl font-semibold">Galeria</h2>
          <div class="grid gap-4 md:grid-cols-3">
            <figure
              *ngFor="let image of selectedCase.gallery"
              class="overflow-hidden rounded-3xl border border-black/10 bg-black/5 dark:border-white/10"
            >
              <img [src]="image" [alt]="selectedCase.title" class="h-full w-full object-cover" loading="lazy" />
            </figure>
          </div>
        </div>

        <div class="flex justify-center">
          <a routerLink="/cases" class="btn-secondary">Voltar para cases</a>
        </div>
      </section>
    </ng-container>

    <ng-template #notFound>
      <section class="container py-20 text-center">
        <h1 class="font-heading text-4xl font-semibold">Case não encontrado</h1>
        <p class="mt-4 text-base text-black/60 dark:text-white/60">
          O case que procurava não existe mais ou foi movido.
        </p>
        <a routerLink="/cases" class="btn-primary mt-6 inline-flex">Explorar portfólio</a>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseDetailComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  private readonly slugSignal = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), {
    initialValue: ''
  });

  readonly caseStudy = computed<CaseStudy | undefined>(() =>
    this.content.getCaseBySlug(this.slugSignal())
  );

  private readonly seoEffect = effect(() => {
    const caseStudy = this.caseStudy();
    if (!caseStudy) {
      this.seo.removeStructuredData();
      return;
    }

    this.seo.update({
      title: `${caseStudy.title} • Arca Studios`,
      description: caseStudy.summary,
      image: caseStudy.cover,
      ldJson: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: caseStudy.title,
        description: caseStudy.summary,
        image: caseStudy.cover,
        about: caseStudy.tags,
        genre: caseStudy.categories,
        url: `https://www.arca-studios.com/cases/${caseStudy.slug}`,
        potentialAction: {
          '@type': 'ViewAction',
          target: `https://www.arca-studios.com/cases/${caseStudy.slug}`
        }
      }
    });
  });

  ngOnDestroy(): void {
    this.seo.removeStructuredData();
  }
}

