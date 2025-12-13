import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, length = 160, suffix = '…'): string {
    if (!value) {
      return '';
    }
    if (value.length <= length) {
      return value;
    }
    return `${value.slice(0, length).trimEnd()}${suffix}`;
  }
}

