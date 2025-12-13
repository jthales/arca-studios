import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '@app/core/services/content.service';
import { SectionTitleComponent } from '@app/shared/components/section-title/section-title.component';
import { CaseGridComponent } from '@app/shared/components/case-grid/case-grid.component';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, CaseGridComponent],
  template: `
    <section class="container space-y-12 py-20">
      <app-section-title
        eyebrow="Portfólio"
        title="Cada case é prova de estratégia, proximidade e execução impecável."
        subtitle="Filtre por categorias ou procure por desafios semelhantes ao seu."
      ></app-section-title>

      <app-case-grid [cases]="cases" [tags]="tags"></app-case-grid>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasesComponent {
  private readonly content = inject(ContentService);

  readonly cases = this.content.cases();
  readonly tags = this.content.getAllTags();
}

