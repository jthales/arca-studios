import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="container py-24 text-center">
      <p class="text-sm uppercase tracking-[0.4em] text-primary/70">Erro 404</p>
      <h1 class="mt-4 font-heading text-5xl font-semibold">Página não encontrada</h1>
      <p class="mx-auto mt-6 max-w-xl text-base text-black/60 dark:text-white/60">
        O caminho que procurava não está aqui. Vamos começar de novo pelo início?
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <a routerLink="/" class="btn-primary">Voltar ao início</a>
        <a routerLink="/contact" class="btn-secondary">Falar com a Arca</a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}

