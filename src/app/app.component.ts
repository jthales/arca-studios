import { Component, inject } from '@angular/core';
import { ShellComponent } from './core/layout/shell/shell.component';
import { AnalyticsService } from './core/services/analytics.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShellComponent],
  template: `<app-shell></app-shell>`
})
export class AppComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => this.analytics.trackPageView(event.urlAfterRedirects));
  }
}
