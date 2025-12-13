import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SkipLinkComponent } from '../skip-link/skip-link.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SkipLinkComponent],
  template: `
    <app-skip-link />
    <div class="flex min-h-screen flex-col bg-white text-black transition dark:bg-black dark:text-white">
      <app-header></app-header>
      <main
        #mainContent
        id="main-content"
        role="main"
        tabindex="-1"
        class="flex-1 bg-white text-black dark:bg-black dark:text-white"
      >
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  @ViewChild('mainContent', { static: true }) mainContent?: ElementRef<HTMLElement>;
  private readonly document = inject(DOCUMENT);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (event.altKey && !event.shiftKey && !event.ctrlKey) {
      if (event.key.toLowerCase() === 'n') {
        event.preventDefault();
        const firstNavLink = this.document.querySelector('app-header nav a') as HTMLElement | null;
        firstNavLink?.focus();
      }
      if (event.key.toLowerCase() === 's') {
        event.preventDefault();
        this.document.getElementById('site-search')?.focus();
      }
    }
  }
}

