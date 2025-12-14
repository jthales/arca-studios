import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  languageService = inject(LanguageService);
  seoService = inject(SEOService);
  
  // Get about translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('about');

  ngOnInit(): void {
    // Update SEO meta tags
    const lang = this.languageService.currentLanguage();
    const translations = this.translations();
    
    const seoData = {
      title: lang === 'pt'
        ? 'Sobre Nós | Arca Studios'
        : lang === 'en'
        ? 'About Us | Arca Studios'
        : 'Sobre Nosotros | Arca Studios',
      description: lang === 'pt'
        ? 'Trabalhamos como uma equipe interna, imergindo na filosofia da sua marca enquanto trazemos expertise e estratégia externas. Sem táticas genéricas — apenas branding + marketing projetados para posicionar, conectar e crescer.'
        : lang === 'en'
        ? 'We work as an internal team, immersing ourselves in your brand philosophy while bringing external expertise and strategy. No generic tactics — just branding + marketing designed to position, connect and grow.'
        : 'Trabajamos como un equipo interno, sumergiéndonos en la filosofía de tu marca mientras aportamos experiencia y estrategia externas. Sin tácticas genéricas — solo branding + marketing diseñados para posicionar, conectar y crecer.',
      keywords: lang === 'pt'
        ? 'sobre arca studios, equipe de branding, estratégia de marketing, agência criativa'
        : lang === 'en'
        ? 'about arca studios, branding team, marketing strategy, creative agency'
        : 'sobre arca studios, equipo de branding, estrategia de marketing, agencia creativa',
      image: 'https://arcastudios.com/images/about-us/about-us.png',
      url: 'https://arcastudios.com/about',
      type: 'website'
    };

    this.seoService.updateSEO(seoData);
    
    // Add breadcrumb schema
    this.seoService.addBreadcrumbSchema([
      { name: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', url: 'https://arcastudios.com' },
      { name: lang === 'pt' ? 'Sobre Nós' : lang === 'en' ? 'About Us' : 'Sobre Nosotros', url: 'https://arcastudios.com/about' }
    ]);
  }
}
