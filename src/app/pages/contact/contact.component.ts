import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  http = inject(HttpClient);
  
  // Get contact translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('contact');

  // Form data
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Form state
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  errorMessage = signal('');

  // Replace with your Formspree endpoint ID
  // Get it from https://formspree.io/forms/YOUR_FORM_ID
  private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

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
    if (this.isSubmitting()) return;

    // Reset status
    this.submitStatus.set('idle');
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    const formPayload = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message,
      _subject: `Nova mensagem de contato de ${this.formData.name}`,
      _format: 'plain'
    };

    this.http.post(this.FORMSPREE_ENDPOINT, formPayload, { headers }).subscribe({
      next: () => {
        this.submitStatus.set('success');
        this.isSubmitting.set(false);
        
        // Reset form
        this.formData = {
          name: '',
          email: '',
          message: ''
        };

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitStatus.set('idle');
        }, 5000);
      },
      error: (error) => {
        this.submitStatus.set('error');
        this.isSubmitting.set(false);
        
        const lang = this.languageService.currentLanguage();
        if (lang === 'pt') {
          this.errorMessage.set('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente por email.');
        } else if (lang === 'en') {
          this.errorMessage.set('Error sending message. Please try again or contact us directly by email.');
        } else {
          this.errorMessage.set('Error al enviar mensaje. Por favor, intente nuevamente o contáctenos directamente por correo electrónico.');
        }

        console.error('Formspree error:', error);
      }
    });
  }
}
