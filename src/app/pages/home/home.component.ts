import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  languageService = inject(LanguageService);
  seoService = inject(SEOService);
  platformId = inject(PLATFORM_ID);
  
  // Get home translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('home');

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Update SEO meta tags
    const lang = this.languageService.currentLanguage();
    const translations = this.translations();
    
    const seoData = {
      title: lang === 'pt' 
        ? 'Autenticidade. Estratégia. Poder. | Arca Studios'
        : lang === 'en'
        ? 'Authenticity. Strategy. Power. | Arca Studios'
        : 'Autenticidad. Estrategia. Poder. | Arca Studios',
      description: lang === 'pt'
        ? 'Transformamos marcas em histórias que conectam. Agência de branding e marketing estratégico especializada em posicionar, conectar e fazer crescer sua marca.'
        : lang === 'en'
        ? 'We transform brands into stories that connect. Strategic branding and marketing agency specialized in positioning, connecting and growing your brand.'
        : 'Transformamos marcas en historias que conectan. Agencia de branding y marketing estratégico especializada en posicionar, conectar y hacer crecer tu marca.',
      keywords: lang === 'pt'
        ? 'branding, marketing estratégico, design, agência digital, identidade visual, posicionamento de marca'
        : lang === 'en'
        ? 'branding, strategic marketing, design, digital agency, visual identity, brand positioning'
        : 'branding, marketing estratégico, diseño, agencia digital, identidad visual, posicionamiento de marca',
      url: 'https://arcastudios.com',
      type: 'website'
    };

    this.seoService.updateSEO(seoData);
    this.seoService.addOrganizationSchema();
    this.seoService.addWebSiteSchema();
  }
}
