import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isBrowser) {
      return;
    }
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
      navigator.sendBeacon(
        '/analytics',
        JSON.stringify({
          type: 'event',
          ...event,
          timestamp: Date.now()
        })
      );
    } else {
      console.info('[Analytics]', event);
    }
  }

  trackPageView(url: string): void {
    if (!this.isBrowser) {
      return;
    }
    console.info('[Analytics] pageview', url);
  }
}

