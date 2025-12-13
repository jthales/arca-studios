import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  languageService = inject(LanguageService);
  
  // Get footer translations as a reactive signal
  footerTranslations = this.languageService.getTranslationsSignal('footer');
  
  // Get header translations for navigation links
  headerTranslations = this.languageService.getTranslationsSignal('header');
}
