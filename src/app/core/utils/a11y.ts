export function focusElement(element?: HTMLElement | null): void {
  if (!element) {
    return;
  }
  if (typeof element.focus === 'function') {
    element.focus({ preventScroll: false });
  }
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(',')));
  if (!focusable.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const isTabPressed = event.key === 'Tab';

  if (!isTabPressed) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

