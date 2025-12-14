import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  languageService = inject(LanguageService);
  
  // Get contact translations as a reactive signal
  translations = this.languageService.getTranslationsSignal('contact');

  // Form data
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    // Here you would typically send the data to a backend service
  }
}
