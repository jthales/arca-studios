import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@app/core/services/content.service';
import { SeoService } from '@app/core/services/seo.service';
import { HeroComponent } from '@app/shared/components/hero/hero.component';
import { SectionTitleComponent } from '@app/shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '@app/shared/components/service-card/service-card.component';
import { CaseCardComponent } from '@app/shared/components/case-card/case-card.component';
import { MetricsCounterComponent } from '@app/shared/components/metrics-counter/metrics-counter.component';
import { CtaBannerComponent } from '@app/shared/components/cta-banner/cta-banner.component';
import { CardGridComponent } from '@app/shared/components/card-grid/card-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    SectionTitleComponent,
    ServiceCardComponent,
    CaseCardComponent,
    MetricsCounterComponent,
    CtaBannerComponent,
    CardGridComponent
  ],
  template: `
    <app-hero
      title="Autenticidade. Estratégia. Poder."
      subtitle="Transformamos marcas em histórias que conectam."
      [primaryCta]="{ label: 'Ver projetos', link: '/cases' }"
      [secondaryCta]="{ label: 'Vamos criar juntos', link: '/contact' }"
      variant="dark"
    ></app-hero>

    <section class="container space-y-10 py-20">
      <app-section-title
        eyebrow="Serviços"
        title="Estratégia que une criatividade e dados."
        subtitle="Do posicionamento à execução, conectamos decisões a resultados visíveis."
      ></app-section-title>

      <app-card-grid [columns]="2">
        <app-service-card
          *ngFor="let service of services.slice(0, 4)"
          [service]="service"
          [headline]="service.title"
        ></app-service-card>
      </app-card-grid>
    </section>

    <section class="bg-gray-100 py-20 dark:bg-zinc-900">
      <div class="container space-y-10">
        <app-section-title
          eyebrow="Portfólio"
          title="Cases que sustentam confiança."
          subtitle="Selecionamos narrativas que demonstram impacto real em diferentes mercados."
        ></app-section-title>

        <app-card-grid [columns]="3">
          <app-case-card *ngFor="let case of featuredCases" [caseStudy]="case"></app-case-card>
        </app-card-grid>
      </div>
    </section>

    <section class="container space-y-10 py-20">
      <app-section-title
        eyebrow="Impacto em números"
        title="Não criamos só impacto — criamos conexões reais."
        subtitle="Indicadores que acompanhamos de perto com cada parceiro."
      ></app-section-title>

      <div class="grid gap-6 md:grid-cols-3">
        <app-metrics-counter
          *ngFor="let metric of metrics.highlights"
          [label]="metric.label"
          [value]="metric.value"
          [description]="metric.description"
        ></app-metrics-counter>
      </div>
    </section>

    <section class="bg-black py-20 dark:bg-primary">
      <div class="container space-y-10">
        <app-section-title
          eyebrow="Impacto"
          title="Vamos ver o que podemos criar juntos."
          subtitle="Projetos pensados para marcas que querem liderar conversas com autenticidade."
          ></app-section-title>
        <div class="grid gap-6 md:grid-cols-3">
          <app-metrics-counter
            *ngFor="let metric of metrics.impact"
            [label]="metric.label"
            [value]="metric.value"
            [description]="metric.description"
          ></app-metrics-counter>
        </div>
      </div>
    </section>

    <section class="container py-20">
      <app-cta-banner
        title="Vamos ver o que podemos criar juntos."
        subtitle="Conte-nos onde sua marca quer chegar e construímos as próximas páginas."
        ctaText="Vamos criar juntos"
        ctaLink="/contact"
      ></app-cta-banner>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly services = this.content.services();
  readonly metrics = this.content.metrics();
  readonly featuredCases = this.content.featuredCases();

  ngOnInit(): void {
    this.seo.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'CreativeAgency',
      name: 'Arca Studios',
      url: 'https://www.arca-studios.com',
      logo: 'https://www.arca-studios.com/assets/arca-logo/arca-logo-og.svg',
      contactPoint: this.content
        .contacts()
        .primary.map((person) => ({
          '@type': 'ContactPoint',
          email: person.email,
          contactType: person.role ?? 'Atendimento',
          areaServed: 'Global'
        }))
    });
  }

  ngOnDestroy(): void {
    this.seo.removeStructuredData();
  }
}

