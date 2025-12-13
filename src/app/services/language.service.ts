import { Injectable, signal, PLATFORM_ID, inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import headerPt from '../translations/pt/header.json';
import headerEn from '../translations/en/header.json';
import headerEs from '../translations/es/header.json';

import homePt from '../translations/pt/home.json';
import homeEn from '../translations/en/home.json';
import homeEs from '../translations/es/home.json';

import aboutPt from '../translations/pt/about.json';
import aboutEn from '../translations/en/about.json';
import aboutEs from '../translations/es/about.json';

import portfolioPt from '../translations/pt/portfolio.json';
import portfolioEn from '../translations/en/portfolio.json';
import portfolioEs from '../translations/es/portfolio.json';

import contactPt from '../translations/pt/contact.json';
import contactEn from '../translations/en/contact.json';
import contactEs from '../translations/es/contact.json';

import footerPt from '../translations/pt/footer.json';
import footerEn from '../translations/en/footer.json';
import footerEs from '../translations/es/footer.json';

export type Language = 'pt' | 'en' | 'es';

// Translation files structure
interface TranslationFiles {
  header: typeof headerPt;
  home: typeof homePt;
  about: typeof aboutPt;
  portfolio: typeof portfolioPt;
  contact: typeof contactPt;
  footer: typeof footerPt;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Translation files organized by language
  private readonly translations: Record<Language, TranslationFiles> = {
    pt: {
      header: headerPt,
      home: homePt,
      about: aboutPt,
      portfolio: portfolioPt,
      contact: contactPt,
      footer: footerPt
    },
    en: {
      header: headerEn,
      home: homeEn,
      about: aboutEn,
      portfolio: portfolioEn,
      contact: contactEn,
      footer: footerEn
    },
    es: {
      header: headerEs,
      home: homeEs,
      about: aboutEs,
      portfolio: portfolioEs,
      contact: contactEs,
      footer: footerEs
    }
  };

  currentLanguage = signal<Language>('pt');

  constructor() {
    if (this.isBrowser) {
      // Load saved language from localStorage or use browser default
      const saved = localStorage.getItem('language') as Language;
      if (saved && this.translations[saved]) {
        this.currentLanguage.set(saved);
      } else {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        const langCode = browserLang.split('-')[0];
        
        // Check if browser language matches any of our supported languages
        if (langCode === 'pt' || langCode === 'en' || langCode === 'es') {
          this.currentLanguage.set(langCode as Language);
        }
        // Default to Portuguese if language not supported
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (this.isBrowser) {
      localStorage.setItem('language', lang);
    }
  }

  /**
   * Get translations for a specific component/page
   * @param component Component name (header, home, about, portfolio, contact)
   */
  getTranslations<T extends keyof TranslationFiles>(component: T): TranslationFiles[T] {
    return this.translations[this.currentLanguage()][component];
  }

  /**
   * Get a computed signal for translations of a specific component/page
   * This is reactive and will update when language changes
   */
  getTranslationsSignal<T extends keyof TranslationFiles>(component: T) {
    return computed(() => this.translations[this.currentLanguage()][component]);
  }
}
