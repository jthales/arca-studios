import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { SEOService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  languageService = inject(LanguageService);
  seoService = inject(SEOService);
  
  // Get contact translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('contact');

  // Form data
  formData = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    // Update SEO meta tags
    const lang = this.languageService.currentLanguage();
    const translations = this.translations();
    
    const seoData = {
      title: lang === 'pt'
        ? 'Contato | Arca Studios'
        : lang === 'en'
        ? 'Contact | Arca Studios'
        : 'Contacto | Arca Studios',
      description: lang === 'pt'
        ? 'Tem um projeto em mente ou quer saber mais sobre como podemos ajudar sua marca a crescer? Entre em contato conosco e vamos conversar.'
        : lang === 'en'
        ? 'Have a project in mind or want to know more about how we can help your brand grow? Contact us and let\'s talk.'
        : '¿Tienes un proyecto en mente o quieres saber más sobre cómo podemos ayudar a tu marca a crecer? Contáctanos y hablemos.',
      keywords: lang === 'pt'
        ? 'contato, orçamento, agência de branding, marketing estratégico, fale conosco'
        : lang === 'en'
        ? 'contact, quote, branding agency, strategic marketing, get in touch'
        : 'contacto, presupuesto, agencia de branding, marketing estratégico, contáctanos',
      url: 'https://arcastudios.com/contact',
      type: 'website'
    };

    this.seoService.updateSEO(seoData);
    
    // Add breadcrumb schema
    this.seoService.addBreadcrumbSchema([
      { name: lang === 'pt' ? 'Início' : lang === 'en' ? 'Home' : 'Inicio', url: 'https://arcastudios.com' },
      { name: lang === 'pt' ? 'Contato' : lang === 'en' ? 'Contact' : 'Contacto', url: 'https://arcastudios.com/contact' }
    ]);
  }

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    // Here you would typically send the data to a backend service
  }
}
