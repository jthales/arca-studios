import { Routes } from '@angular/router';
import { botDetectionGuard } from './core/guards/bot-detection.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Arca Studios • Autenticidade. Estratégia. Poder.',
    data: {
      meta: {
        description: 'Transformamos marcas em histórias que conectam com autenticidade, estratégia e poder.',
        image: '/assets/arca-logo/arca-logo-og.svg'
      }
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    title: 'Sobre • Arca Studios',
    data: {
      meta: {
        description:
          'Conheça a filosofia da Arca Studios: equipe híbrida, expertise externa e narrativas que recusam táticas genéricas.'
      }
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services.component').then((m) => m.ServicesComponent),
    title: 'Serviços • Arca Studios',
    data: {
      meta: {
        description:
          'Branding, consultoria e posicionamento, estratégia de marketing e conteúdo & design feitos sob medida.'
      }
    }
  },
  {
    path: 'cases',
    loadComponent: () => import('./features/cases/cases.component').then((m) => m.CasesComponent),
    title: 'Cases • Arca Studios',
    data: {
      meta: {
        description:
          'Portfólio com estratégias 360°, branding autêntico e campanhas que geraram impacto mensurável em diversos mercados.'
      }
    }
  },
  {
    path: 'cases/:slug',
    loadComponent: () =>
      import('./features/cases/case-detail/case-detail.component').then((m) => m.CaseDetailComponent),
    title: 'Case • Arca Studios',
    data: {
      meta: {
        description: 'Detalhes completos de cada projeto: desafio, estratégia, resultados e métricas.'
      }
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    canActivate: [botDetectionGuard],
    title: 'Contato • Arca Studios',
    data: {
      meta: {
        description:
          'Pronto para criar algo novo? Converse com a Arca Studios e vamos construir a próxima história da sua marca.'
      }
    }
  },
  {
    path: '404',
    loadComponent: () => import('./features/errors/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Página não encontrada • Arca Studios',
    data: {
      meta: {
        description: 'A página que procura não existe. Explore o site da Arca Studios para descobrir nossos projetos.'
      }
    }
  },
  {
    path: '500',
    loadComponent: () => import('./features/errors/server-error.component').then((m) => m.ServerErrorComponent),
    title: 'Erro interno • Arca Studios',
    data: {
      meta: {
        description: 'Algo não saiu como esperado. Nossa equipa já está a trabalhar para resolver.'
      }
    }
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
