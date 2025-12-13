import { DOCUMENT, Location } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  ldJson?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private jsonLdElement?: HTMLScriptElement;

  private readonly defaultTitle = 'Arca Studios';
  private readonly defaultDescription =
    'Autenticidade, estratégia e poder para transformar marcas em histórias que conectam.';
  private readonly defaultImage = '/assets/arca-logo/arca-logo-og.svg';

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((route) => {
          let activated = route;
          while (activated.firstChild) {
            activated = activated.firstChild;
          }
          return activated;
        }),
        mergeMap((route) => route.data),
        takeUntilDestroyed()
      )
      .subscribe((data) => {
        const meta = data['meta'] as SeoMeta | undefined;
        this.update(meta ?? {});
      });
  }

  update(meta: SeoMeta): void {
    const title = meta.title ?? this.defaultTitle;
    const description = meta.description ?? this.defaultDescription;
    const image = meta.image ?? this.defaultImage;
    const canonical = meta.canonical ?? this.createCanonicalUrl();

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: (meta.keywords ?? []).join(', ') });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.upsertCanonicalLink(canonical);

    if (meta.ldJson) {
      this.setStructuredData(meta.ldJson);
    } else {
      this.removeStructuredData();
    }
  }

  setStructuredData(data: Record<string, unknown>): void {
    if (!this.isBrowser) {
      return;
    }
    this.removeStructuredData();
    this.jsonLdElement = this.document.createElement('script');
    this.jsonLdElement.type = 'application/ld+json';
    this.jsonLdElement.text = JSON.stringify(data);
    this.document.head.appendChild(this.jsonLdElement);
  }

  removeStructuredData(): void {
    if (!this.isBrowser || !this.jsonLdElement) {
      return;
    }
    this.document.head.removeChild(this.jsonLdElement);
    this.jsonLdElement = undefined;
  }

  private upsertCanonicalLink(url: string): void {
    if (!this.document.head) {
      return;
    }
    let link = this.document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private createCanonicalUrl(): string {
    if (!this.isBrowser) {
      return `https://www.arca-studios.com${this.location.path()}`;
    }
    const { protocol, host } = window.location;
    return `${protocol}//${host}${this.location.path()}`;
  }
}

