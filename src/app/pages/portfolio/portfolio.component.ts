import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

interface PortfolioProject {
  id: number;
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  languageService = inject(LanguageService);
  seoService = inject(SEOService);
  
  // Get portfolio translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('portfolio');

  // Projects data
  projects: PortfolioProject[] = [
    {
      id: 1,
      name: 'Projeto Exemplo 1',
      image: '/images/projects/project1.png',
      description: 'Branding e estratégia digital'
    },
    {
      id: 2,
      name: 'Projeto Exemplo 2',
      image: '/images/projects/project2.png',
      description: 'Branding e design'
    },
    {
      id: 3,
      name: 'Projeto Exemplo 3',
      image: '/images/projects/project3.png',
      description: 'Estratégia digital e marketing'
    },
    {
      id: 4,
      name: 'Projeto Exemplo 4',
      image: '/images/projects/project4.png',
      description: 'Branding e estratégia digital'
    },
    {
      id: 5,
      name: 'Projeto Exemplo 5',
      image: '/images/projects/project5.png',
      description: 'Design e marketing'
    },
    {
      id: 6,
      name: 'Projeto Exemplo 6',
      image: '/images/projects/project6.png',
      description: 'Branding, design e estratégia digital'
    }
  ];

  ngOnInit(): void {
    // Update SEO meta tags
    const lang = this.languageService.currentLanguage();
    const translations = this.translations();
    
    const seoData = {
      title: lang === 'pt'
        ? 'Portfólio | Arca Studios'
        : lang === 'en'
        ? 'Portfolio | Arca Studios'
        : 'Portafolio | Arca Studios',
      description: lang === 'pt'
        ? 'Explorando a autenticidade e a estratégia para construir marcas com poder. Conheça nossos projetos de branding e marketing estratégico.'
        : lang === 'en'
        ? 'Exploring authenticity and strategy to build powerful brands. Discover our branding and strategic marketing projects.'
        : 'Explorando la autenticidad y la estrategia para construir marcas con poder. Conoce nuestros proyectos de branding y marketing estratégico.',
      keywords: lang === 'pt'
        ? 'portfólio, projetos de branding, cases de sucesso, trabalhos realizados, agência criativa'
        : lang === 'en'
        ? 'portfolio, branding projects, success cases, completed work, creative agency'
        : 'portafolio, proyectos de branding, casos de éxito, trabajos realizados, agencia creativa',
      image: 'https://arcastudios.com/images/projects/project1.png',
      url: 'https://arcastudios.com/portfolio',
      type: 'website'
    };

    this.seoService.updateSEO(seoData);
    
    // Add breadcrumb schema
    this.seoService.addBreadcrumbSchema([
      { name: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', url: 'https://arcastudios.com' },
      { name: lang === 'pt' ? 'Portfólio' : lang === 'en' ? 'Portfolio' : 'Portafolio', url: 'https://arcastudios.com/portfolio' }
    ]);
  }
}
