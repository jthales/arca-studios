import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="grid gap-6"
      [ngClass]="{
        'md:grid-cols-2 xl:grid-cols-3': columns === 3,
        'md:grid-cols-2': columns === 2,
        'grid-cols-1': columns === 1
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGridComponent {
  @Input() columns: 1 | 2 | 3 = 3;
}

