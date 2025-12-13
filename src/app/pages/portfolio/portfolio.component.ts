import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

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
export class PortfolioComponent {
  languageService = inject(LanguageService);
  
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
}
