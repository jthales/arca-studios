import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="border-t border-black/5 bg-gray-100 px-6 py-6 dark:border-white/10 dark:bg-black">
      <div class="container grid gap-10 md:grid-cols-3">
        <div>
          <img
            src="/assets/arca-logo/arca-logo-black.svg"
            alt="Arca Studios"
            width="180"
            height="48"
            class="mb-4 h-10 max-w-full dark:hidden"
          />
          <img
            src="/assets/arca-logo/arca-logo-white.svg"
            alt="Arca Studios"
            width="180"
            height="48"
            class="mb-4 hidden h-10 max-w-full dark:block"
          />
          <p class="text-sm leading-relaxed text-black/70 dark:text-white/70">
            Autenticidade, estratégia e poder para marcas que querem criar conexões reais.
          </p>
        </div>

        <div>
          <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">Atalhos</h2>
          <ul class="flex flex-col gap-2 text-sm">
            <li><a routerLink="/" class="hover:text-primary">Início</a></li>
            <li><a routerLink="/about" class="hover:text-primary">Sobre</a></li>
            <li><a routerLink="/services" class="hover:text-primary">Serviços</a></li>
            <li><a routerLink="/cases" class="hover:text-primary">Cases</a></li>
            <li><a routerLink="/contact" class="hover:text-primary">Contato</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">Conversas</h2>
          <ul class="flex flex-col gap-2 text-sm" aria-label="Contactos principais">
            <li *ngFor="let person of content.contacts()?.primary">
              <a class="hover:text-primary" [href]="'mailto:' + person.email">
                {{ person.email }}
              </a>
              <p class="text-xs text-black/60 dark:text-white/60">{{ person.role }}</p>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
            Redes
          </h2>
          <ul class="flex flex-col gap-2 text-sm">
            <li *ngFor="let social of content.contacts()?.social">
              <a class="hover:text-primary" [href]="social.url" target="_blank" rel="noopener noreferrer">
                {{ social.network }}
              </a>
              <p class="text-xs text-black/60 dark:text-white/60">{{ social.handle }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-black/10 pt-6 text-xs text-black/60 dark:border-white/10 dark:text-white/60 text-center">
        © {{ currentYear }} Arca Studios. Construindo histórias que conectam.
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly content = inject(ContentService);
  readonly currentYear = new Date().getFullYear();
}

