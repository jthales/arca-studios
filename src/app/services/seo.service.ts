import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LanguageService, Language } from './language.service';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly baseUrl = 'https://arcastudios.com'; // TODO: Update with actual domain
  private readonly defaultImage = `${this.baseUrl}/images/logo.png`;
  private readonly siteName = 'Arca Studios';

  /**
   * Update SEO meta tags for a page
   */
  updateSEO(data: SEOData): void {
    if (!this.isBrowser) return;

    const lang = this.languageService.currentLanguage();
    const currentUrl = this.document.location?.href || data.url || this.baseUrl;
    const canonicalUrl = data.url || currentUrl.split('?')[0];

    // Update title
    const fullTitle = data.title.includes(this.siteName) 
      ? data.title 
      : `${data.title} | ${this.siteName}`;
    this.title.setTitle(fullTitle);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }
    this.meta.updateTag({ name: 'author', content: this.siteName });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: lang });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: this.getLocale(lang) });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || this.defaultImage });

    // Canonical URL
    this.updateCanonicalUrl(canonicalUrl);

    // Update HTML lang attribute
    this.updateHtmlLang(lang);

    // Add hreflang tags for multilingual support
    this.updateHreflangTags(canonicalUrl);
  }

  /**
   * Add structured data (JSON-LD) to the page
   */
  addStructuredData(data: object): void {
    if (!this.isBrowser) return;

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';
    
    // Remove existing structured data if any
    const existing = this.document.getElementById('structured-data');
    if (existing) {
      existing.remove();
    }
    
    this.document.head.appendChild(script);
  }

  /**
   * Add Organization structured data
   */
  addOrganizationSchema(): void {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      url: this.baseUrl,
      logo: this.defaultImage,
      description: 'Agência de branding e marketing estratégico que transforma marcas em histórias que conectam.',
      sameAs: [
        'https://youtube.com',
        'https://linkedin.com',
        'https://twitter.com'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'contato@arcastudios.com'
      }
    };

    this.addStructuredData(organizationSchema);
  }

  /**
   * Add WebSite structured data
   */
  addWebSiteSchema(): void {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    this.addStructuredData(websiteSchema);
  }

  /**
   * Add BreadcrumbList structured data
   */
  addBreadcrumbSchema(items: Array<{ name: string; url: string }>): void {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };

    this.addStructuredData(breadcrumbSchema);
  }

  /**
   * Update canonical URL
   */
  private updateCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    
    canonical.setAttribute('href', url);
  }

  /**
   * Update HTML lang attribute
   */
  private updateHtmlLang(lang: Language): void {
    const html = this.document.documentElement;
    const langMap: Record<Language, string> = {
      pt: 'pt-BR',
      en: 'en-US',
      es: 'es-ES'
    };
    html.setAttribute('lang', langMap[lang] || 'pt-BR');
  }

  /**
   * Get locale for Open Graph
   */
  private getLocale(lang: Language): string {
    const localeMap: Record<Language, string> = {
      pt: 'pt_BR',
      en: 'en_US',
      es: 'es_ES'
    };
    return localeMap[lang] || 'pt_BR';
  }

  /**
   * Update hreflang tags for multilingual support
   */
  private updateHreflangTags(canonicalUrl: string): void {
    // Remove existing hreflang tags
    const existingHreflangs = this.document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(link => link.remove());

    // Add hreflang tags for all supported languages
    const languages: Language[] = ['pt', 'en', 'es'];
    const hreflangMap: Record<Language, string> = {
      pt: 'pt-BR',
      en: 'en-US',
      es: 'es-ES'
    };

    languages.forEach(lang => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflangMap[lang]);
      link.setAttribute('href', canonicalUrl);
      this.document.head.appendChild(link);
    });

    // Add x-default
    const defaultLink = this.document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', canonicalUrl);
    this.document.head.appendChild(defaultLink);
  }
}

