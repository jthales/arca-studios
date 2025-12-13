import { Directive, ElementRef, HostListener } from '@angular/core';
import { trapFocus } from '@app/core/utils/a11y';

@Directive({
  selector: '[appTrapFocus]',
  standalone: true
})
export class TrapFocusDirective {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    trapFocus(this.elementRef.nativeElement, event);
  }
}

