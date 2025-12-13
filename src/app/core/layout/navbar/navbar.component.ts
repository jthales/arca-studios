import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
  ariaLabel?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav
      class="flex gap-6 text-sm font-medium"
      [attr.aria-label]="ariaLabel ?? 'Navegação principal'"
      [ngClass]="{
        'flex-col gap-4': orientation === 'vertical',
        'flex-row items-center': orientation === 'horizontal'
      }"
    >
      <a
        *ngFor="let link of links"
        [routerLink]="link.path"
        routerLinkActive="text-primary"
        #rla="routerLinkActive"
        [routerLinkActiveOptions]="{ exact: true }"
        class="relative inline-flex transition-colors duration-200 hover:text-primary focus:outline-none no-underline hover:no-underline focus-visible:no-underline"
        [attr.aria-label]="link.ariaLabel ?? link.label"
        (click)="linkSelected.emit()"
      >
        <span
          class="relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full"
          [ngClass]="{ 'after:w-full': rla.isActive }"
        >
          {{ link.label }}
        </span>
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() links: NavLink[] = [];
  @Input() ariaLabel?: string;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Output() linkSelected = new EventEmitter<void>();
}

