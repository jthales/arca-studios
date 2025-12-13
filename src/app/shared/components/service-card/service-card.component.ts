import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ServiceModel } from '@app/core/models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="group flex h-full flex-col gap-3 rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-zinc-900"
    >
      <span class="text-sm font-medium uppercase tracking-widest text-primary/70"> {{ service.title }} </span>
      <h3 class="font-heading text-xl font-semibold">{{ headline }}</h3>
      <p class="text-sm text-black/70 dark:text-white/70">
        {{ service.description }}
      </p>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceModel;
  @Input() headline = 'Nossa abordagem';
}

