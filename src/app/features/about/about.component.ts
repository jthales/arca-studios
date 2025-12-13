import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionTitleComponent } from '@app/shared/components/section-title/section-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  template: `
    <section class="container space-y-12 py-20">
      <app-section-title
        eyebrow="Sobre nós"
        title="Um estúdio híbrido, com time interno e rede de especialistas."
        subtitle="Criamos estratégias e narrativas com profundidade, recusando táticas genéricas que tratam marcas como números."
      ></app-section-title>

      <div class="grid gap-10 md:grid-cols-2">
        <div class="space-y-4">
          <h3 class="font-heading text-2xl font-semibold">Filosofia Arca</h3>
          <p class="text-base text-black/70 dark:text-white/70">
            Funcionamos como extensão do time interno, somando repertório externo e especialistas de confiança. Acreditamos
            que marcas são organismos vivos: precisam de autenticidade para criar relações duradouras, estratégia para
            sustentar resultados e poder para transformar conversas em ação.
          </p>
        </div>

        <div class="space-y-4">
          <h3 class="font-heading text-2xl font-semibold">Como entregamos</h3>
          <ul class="space-y-3 text-base text-black/70 dark:text-white/70">
            <li><strong>Imersão:</strong> mergulhamos na cultura da marca e do público para mapear tensões reais.</li>
            <li><strong>Constância:</strong> decisões guiadas por dados, com cadência ajustada à realidade do negócio.</li>
            <li><strong>Posicionamento:</strong> narrativas construídas para ocupar espaços estratégicos na mente das pessoas.</li>
            <li><strong>Histórias que conectam:</strong> entregas criativas que provocam diálogo e geram movimento.</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}

