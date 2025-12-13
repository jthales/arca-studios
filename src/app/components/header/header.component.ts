import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  languageService = inject(LanguageService);
  router = inject(Router);
  
  languages: Language[] = ['pt', 'en', 'es'];
  languageNames = {
    pt: 'PT',
    en: 'EN',
    es: 'ES'
  };

  // Get header translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('header');
  currentLanguage = this.languageService.currentLanguage;
  showLanguageMenu = false;
  showMobileMenu = false;

  ngOnInit(): void {
    // Component initialization
  }

  changeLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
    this.showLanguageMenu = false;
  }

  getFlagPath(lang: Language): string {
    const flagPaths: Record<Language, string> = {
      pt: '/images/flags/pt.svg',
      en: '/images/flags/gb.svg',
      es: '/images/flags/es.svg'
    };
    return flagPaths[lang];
  }

  getOtherLanguages(): Language[] {
    return this.languages.filter(lang => lang !== this.currentLanguage());
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }

  scrollToContact(): void {
    this.closeMobileMenu();
    if (this.router.url === '/contact') {
      // If already on contact page, scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Navigate to contact page
      this.router.navigate(['/contact']).then(() => {
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  }
}
