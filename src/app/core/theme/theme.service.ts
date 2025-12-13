import { DOCUMENT } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, computed, effect, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { ThemeMode } from './tokens';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'arca.theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly prefersDark = this.isBrowser
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  private readonly modeSignal = signal<ThemeMode>('light');

  readonly mode = computed(() => this.modeSignal());
  readonly modeChanges = toObservable(this.modeSignal);

  constructor() {
    if (this.isBrowser) {
      const stored = localStorage.getItem(this.storageKey) as ThemeMode | null;
      const systemMode: ThemeMode = this.prefersDark?.matches ? 'dark' : 'light';
      const initial = stored ?? systemMode;
      this.modeSignal.set(initial);
      this.applyTheme(initial);
      this.prefersDark?.addEventListener('change', (event) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(event.matches ? 'dark' : 'light', false);
        }
      });
    }

    effect(() => {
      this.applyTheme(this.modeSignal());
    });
  }

  toggle(): void {
    const next: ThemeMode = this.modeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(mode: ThemeMode, persist = true): void {
    this.modeSignal.set(mode);
    if (this.isBrowser && persist) {
      localStorage.setItem(this.storageKey, mode);
    }
  }

  reset(): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem(this.storageKey);
    const systemMode: ThemeMode = this.prefersDark?.matches ? 'dark' : 'light';
    this.setTheme(systemMode, false);
  }

  private applyTheme(mode: ThemeMode): void {
    if (!this.isBrowser) {
      return;
    }
    const root = this.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    this.document.body.classList.toggle('dark', mode === 'dark');
    this.document.body.dataset['theme'] = mode;
  }
}

