import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-skip-link',
  standalone: true,
  template: `
    <a class="skip-link" href="#main-content">
      Pular para o conteúdo principal
    </a>
  `,
  styles: [
    `
      .skip-link {
        position: absolute;
        top: -50px;
        left: 1rem;
        padding: 0.75rem 1.25rem;
        background: var(--arca-primary);
        color: var(--arca-white);
        border-radius: 999px;
        z-index: 999;
        transition: top 0.2s ease-out;
      }

      .skip-link:focus {
        top: 1rem;
      }
    `
  ]
})
export class SkipLinkComponent {
  @HostBinding('attr.aria-hidden') ariaHidden = 'false';
}

