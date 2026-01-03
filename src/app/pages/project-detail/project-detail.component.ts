import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  client: string;
  year: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  languageService = inject(LanguageService);
  seoService = inject(SEOService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Get projects translations as a reactive signal
  projectsData = this.languageService.getTranslationsSignal('projects');
  
  // Get portfolio translations for detail page labels
  portfolioTranslations = this.languageService.getTranslationsSignal('portfolio');
  
  project: Project | null = null;
  projectId: number | null = null;

  constructor() {
    // Effect to reload project when language changes
    effect(() => {
      // Access the signals to create dependency
      this.projectsData();
      this.portfolioTranslations();
      
      // Reload project if we have an ID
      if (this.projectId) {
        this.loadProject();
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      this.projectId = id;
      this.loadProject();
    });
  }

  loadProject(): void {
    if (!this.projectId) return;

    const projects = this.projectsData().projects as Project[];
    this.project = projects.find(p => p.id === this.projectId) || null;

    if (!this.project) {
      // Redirect to portfolio if project not found
      this.router.navigate(['/portfolio']);
      return;
    }

    // Update SEO meta tags
    const lang = this.languageService.currentLanguage();
    
    const seoData = {
      title: `${this.project.name} | ${lang === 'pt' ? 'Portfólio' : lang === 'en' ? 'Portfolio' : 'Portafolio'} | Arca Studios`,
      description: this.project.overview,
      keywords: `${this.project.category}, ${this.project.services.join(', ')}, branding, marketing estratégico`,
      image: `https://arcastudios.com${this.project.image}`,
      url: `https://arcastudios.com/portfolio/${this.project.id}`,
      type: 'website'
    };

    this.seoService.updateSEO(seoData);
    
    // Add breadcrumb schema
    this.seoService.addBreadcrumbSchema([
      { name: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', url: 'https://arcastudios.com' },
      { name: lang === 'pt' ? 'Portfólio' : lang === 'en' ? 'Portfolio' : 'Portafolio', url: 'https://arcastudios.com/portfolio' },
      { name: this.project.name, url: `https://arcastudios.com/portfolio/${this.project.id}` }
    ]);
  }

  getBackUrl(): string {
    return '/portfolio';
  }
}
