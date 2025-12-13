import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre Nós'
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    title: 'Portfólio'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contato'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
