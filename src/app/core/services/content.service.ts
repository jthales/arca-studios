import { inject, Injectable, signal } from '@angular/core';
import type { CaseStudy } from '../models/case.model';
import type { ServiceModel } from '../models/service.model';
import type { MetricsSummary } from '../models/metrics.model';
import type { ContactDirectory } from '../models/contact.model';
import servicesJson from '@assets/mock/services.json';
import casesJson from '@assets/mock/cases.json';
import metricsJson from '@assets/mock/metrics.json';
import contactsJson from '@assets/mock/contacts.json';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly router = inject(Router);

  private readonly servicesSignal = signal<ServiceModel[]>(servicesJson as ServiceModel[]);
  private readonly casesSignal = signal<CaseStudy[]>(casesJson as CaseStudy[]);
  private readonly metricsSignal = signal<MetricsSummary>(metricsJson as MetricsSummary);
  private readonly contactsSignal = signal<ContactDirectory>(contactsJson as ContactDirectory);

  services = this.servicesSignal.asReadonly();
  cases = this.casesSignal.asReadonly();
  metrics = this.metricsSignal.asReadonly();
  contacts = this.contactsSignal.asReadonly();

  featuredCases(limit = 6): CaseStudy[] {
    return this.cases().slice(0, limit);
  }

  getCaseBySlug(slug: string): CaseStudy | undefined {
    return this.cases().find((item) => item.slug === slug);
  }

  filterCases(term: string, tags: string[] = []): CaseStudy[] {
    const normalizedTerm = term.toLowerCase();
    return this.cases().filter((item) => {
      const matchesTerm =
        !normalizedTerm ||
        item.title.toLowerCase().includes(normalizedTerm) ||
        item.summary.toLowerCase().includes(normalizedTerm) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedTerm));
      const matchesTags = tags.length === 0 || tags.every((tag) => item.tags.includes(tag) || item.categories.includes(tag));
      return matchesTerm && matchesTags;
    });
  }

  getAllTags(): string[] {
    const set = new Set<string>();
    this.cases().forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
      item.categories.forEach((category) => set.add(category));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  navigateToCase(slug: string): void {
    void this.router.navigate(['/cases', slug]);
  }
}

