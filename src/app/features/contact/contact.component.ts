import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '@app/core/services/analytics.service';
import { ContentService } from '@app/core/services/content.service';
import { SectionTitleComponent } from '@app/shared/components/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent],
  template: `
    <section class="container space-y-12 py-20">
      <app-section-title
        eyebrow="Contato"
        title="Vamos criar juntos"
        subtitle="Conte-nos o desafio e retornamos com o próximo passo."
      ></app-section-title>

      <div class="grid gap-12 md:grid-cols-[2fr,1fr]">
        <form
          class="space-y-6 rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-black/40"
          novalidate
          (ngSubmit)="submit()"
          [formGroup]="contactForm"
        >
          <div class="grid gap-4 md:grid-cols-2">
            <label class="flex flex-col gap-2 text-sm font-medium">
              Nome
              <input
                type="text"
                formControlName="name"
                autocomplete="name"
                class="rounded-full border border-black/10 px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/15 dark:bg-black/40"
                required
              />
              <span class="text-xs text-primary" *ngIf="fieldInvalid('name')">Nome é obrigatório.</span>
            </label>
            <label class="flex flex-col gap-2 text-sm font-medium">
              Email
              <input
                type="email"
                formControlName="email"
                autocomplete="email"
                class="rounded-full border border-black/10 px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/15 dark:bg-black/40"
                required
              />
              <span class="text-xs text-primary" *ngIf="fieldInvalid('email')">Insira um email válido.</span>
            </label>
          </div>

          <label class="flex flex-col gap-2 text-sm font-medium">
            Mensagem
            <textarea
              formControlName="message"
              rows="5"
              class="rounded-3xl border border-black/10 px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/15 dark:bg-black/40"
              required
            ></textarea>
            <span class="text-xs text-primary" *ngIf="fieldInvalid('message')">
              Conte-nos um pouco sobre o desafio.
            </span>
          </label>

          <button type="submit" class="btn-primary">
            Vamos criar juntos
          </button>

          <p class="text-sm text-primary" *ngIf="submitted()">
            Recebemos sua mensagem. Em breve retornaremos.
          </p>
        </form>

        <aside class="space-y-4 rounded-3xl border border-black/10 bg-gray-100 p-8 text-sm dark:border-white/10 dark:bg-black/40">
          <h2 class="font-heading text-lg font-semibold">Fale com a Arca</h2>
          <p class="text-black/70 dark:text-white/70">
            Preferimos conversas diretas. Escreva para:
          </p>
          <ul class="space-y-3">
            <li *ngFor="let person of content.contacts()?.primary">
              <p class="font-medium text-black dark:text-white">{{ person.name }}</p>
              <a class="text-primary hover:underline" [href]="'mailto:' + person.email">
                {{ person.email }}
              </a>
              <p class="text-xs text-black/60 dark:text-white/60">{{ person.role }}</p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly analytics = inject(AnalyticsService);
  protected readonly content = inject(ContentService);

  readonly submitted = signal(false);

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  fieldInvalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.analytics.trackEvent({
      category: 'contact',
      action: 'form_submitted',
      label: this.contactForm.value.email ?? undefined
    });

    this.submitted.set(true);
    this.contactForm.reset();
  }
}

