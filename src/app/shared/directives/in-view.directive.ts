import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements OnInit, OnDestroy {
  @Output() appInView = new EventEmitter<boolean>();

  private observer?: IntersectionObserver;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.appInView.emit(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: [0, 0.2, 0.5, 1]
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

