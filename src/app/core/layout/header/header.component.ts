import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent, NavLink } from '../navbar/navbar.component';
import { ThemeService } from '../../theme/theme.service';

const NAV_LINKS: NavLink[] = [
  { label: 'Início', path: '/' },
  { label: 'Sobre', path: '/about' },
  { label: 'Serviços', path: '/services' },
  { label: 'Cases', path: '/cases' },
  { label: 'Contato', path: '/contact' }
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, MatButtonModule, MatIconModule],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-black/5 bg-white/85 px-6 py-4 backdrop-blur transition dark:border-white/10 dark:bg-black/70"
      role="banner"
    >
      <div class="container relative flex items-center justify-center gap-6 lg:justify-between">
        <button
          type="button"
          class="absolute left-0 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-black transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-white lg:hidden"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          [attr.aria-label]="menuOpen() ? 'Fechar menu' : 'Abrir menu'"
        >
            <span class="relative block h-[20px] w-6">
            <span
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300"
                style="top: 0"
                [class.translate-y-[9px]]="menuOpen()"
                [class.rotate-45]="menuOpen()"
            ></span>
            <span
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition-opacity duration-300"
              [class.opacity-0]="menuOpen()"
                style="top: 9px"
            ></span>
            <span
                class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300"
                style="bottom: 0"
                [class.-translate-y-[9px]]="menuOpen()"
              [class.-rotate-45]="menuOpen()"
            ></span>
          </span>
        </button>

        <a routerLink="/" class="flex items-center gap-3 font-heading text-xl font-semibold tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:mx-0 lg:translate-x-0 lg:order-1">
          <img
            [src]="logoSrc()"
            width="142"
            height="32"
            alt="Arca Studios"
            class="h-8 w-100%"
            loading="eager"
          />
        </a>

        <app-navbar class="hidden lg:flex lg:flex-1 lg:justify-center lg:order-2" [links]="links"></app-navbar>

        <div class="absolute right-0 flex items-center gap-3 lg:static lg:ml-auto lg:order-3">
          <button
            mat-icon-button
            type="button"
            class="rounded-full border border-black/10 bg-white text-black transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-white/20 dark:bg-black/40 dark:text-white"
            (click)="toggleTheme()"
            [attr.aria-pressed]="isDark()"
          >
            <mat-icon
              fontSet="material-symbols-outlined"
              [fontIcon]="isDark() ? 'light_mode' : 'dark_mode'"
              aria-hidden="true"
            ></mat-icon>
            <span class="sr-only">
              {{ isDark() ? 'Ativar modo claro' : 'Ativar modo escuro' }}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        *ngIf="menuOpen()"
        class="mt-4 flex flex-col gap-4 rounded-3xl bg-white/95 pl-4 pr-6 py-4 text-base shadow-elevated backdrop-blur dark:bg-black/90 lg:hidden"
      >
        <app-navbar [links]="links" orientation="vertical" (linkSelected)="closeMenu()"></app-navbar>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly theme = inject(ThemeService);
  private readonly mode = toSignal(this.theme.modeChanges, { initialValue: this.theme.mode() });
  private readonly menuSignal = signal(false);

  readonly links = NAV_LINKS;

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly menuOpen = computed(() => this.menuSignal());
  readonly logoSrc = computed(() =>
    this.isDark() ? '/assets/arca-logo/arca-logo-white.svg' : '/assets/arca-logo/arca-logo-black.svg'
  );

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleMenu(): void {
    this.menuSignal.update((open) => !open);
  }

  closeMenu(): void {
    this.menuSignal.set(false);
  }
}

