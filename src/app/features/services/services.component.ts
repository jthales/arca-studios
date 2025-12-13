import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '@app/core/services/content.service';
import { SectionTitleComponent } from '@app/shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '@app/shared/components/service-card/service-card.component';
import { CardGridComponent } from '@app/shared/components/card-grid/card-grid.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, ServiceCardComponent, CardGridComponent],
  template: `
    <section class="container space-y-12 py-20">
      <app-section-title
        eyebrow="O que fazemos"
        title="Da estratégia à execução, com foco em consistência e crescimento."
        subtitle="Cada serviço é construído para fortalecer posicionamento, acelerar resultados e manter a marca viva."
      ></app-section-title>

      <app-card-grid [columns]="2">
        <app-service-card
          *ngFor="let service of services"
          [service]="service"
          [headline]="service.title"
        ></app-service-card>
      </app-card-grid>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  private readonly content = inject(ContentService);
  readonly services = this.content.services();
}

