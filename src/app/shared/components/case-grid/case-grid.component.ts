import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CaseStudy } from '@app/core/models/case.model';
import { CaseCardComponent } from '../case-card/case-card.component';
import { CardGridComponent } from '../card-grid/card-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-case-grid',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CaseCardComponent, CardGridComponent, MatIconModule],
  template: `
    <section class="space-y-8">
      <div class="mb-4 flex flex-col gap-4">

        <div class="flex flex-wrap gap-2 md:gap-3">
          <button
            type="button"
            class="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition"
            [ngClass]="selectedTags().size === 0 ? activeClass : inactiveClass"
            (click)="clearFilters()"
          >
            Todas
          </button>
          <button
            type="button"
            *ngFor="let tag of availableTags"
            class="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition"
            [ngClass]="selectedTags().has(tag) ? activeClass : inactiveClass"
            (click)="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <app-card-grid [columns]="3">
        <app-case-card *ngFor="let item of pagedCases()" [caseStudy]="item"></app-case-card>
      </app-card-grid>

      <div class="flex items-center justify-between gap-4">
        <p class="text-sm text-black/60 dark:text-white/60">
          {{ filteredCases().length }} case(s) encontrados
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="btn-secondary px-4 py-2 text-xs"
            (click)="previousPage()"
            [disabled]="currentPage() === 1"
          >
            Anterior
          </button>
          <span class="text-sm">
            Página {{ currentPage() }} / {{ totalPages() }}
          </span>
          <button
            type="button"
            class="btn-secondary px-4 py-2 text-xs"
            (click)="nextPage()"
            [disabled]="currentPage() === totalPages()"
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseGridComponent {
  @Input({ required: true }) cases: CaseStudy[] = [];
  @Input() tags: string[] = [];
  @Input() pageSize = 6;

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly selectedTags = signal<Set<string>>(new Set());
  readonly currentPage = signal(1);

  readonly activeClass = 'border-primary bg-primary text-white';
  readonly inactiveClass =
    'border-black/10 bg-white text-black hover:border-primary hover:text-primary dark:border-white/15 dark:bg-black dark:text-white';

  constructor() {
    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.currentPage.set(1));
  }

  readonly filteredCases = computed(() => {
    const term = this.searchControl.value.toLowerCase();
    const tagsSelected = Array.from(this.selectedTags());

    return this.cases.filter((item) => {
      const matchesTerm =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term));
      const matchesTags =
        tagsSelected.length === 0 ||
        tagsSelected.every((tag) => item.tags.includes(tag) || item.categories.includes(tag));
      return matchesTerm && matchesTags;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredCases().length / this.pageSize))
  );

  readonly pagedCases = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredCases().slice(start, start + this.pageSize);
  });

  get availableTags(): string[] {
    return this.tags.length ? this.tags : this.extractTags();
  }

  toggleTag(tag: string): void {
    const next = new Set(this.selectedTags());
    if (next.has(tag)) {
      next.delete(tag);
    } else {
      next.add(tag);
    }
    this.selectedTags.set(next);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.selectedTags.set(new Set());
    this.searchControl.setValue('');
    this.currentPage.set(1);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  private extractTags(): string[] {
    const set = new Set<string>();
    this.cases.forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
      item.categories.forEach((category) => set.add(category));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }
}

