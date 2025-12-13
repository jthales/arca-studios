import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AnalyticsService } from '../services/analytics.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const analytics = inject(AnalyticsService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      analytics.trackEvent({
        category: 'http',
        action: `${req.method} ${req.url}`,
        label: error.statusText,
        value: error.status
      });

      if (error.status === 404) {
        void router.navigate(['/404'], { state: { referer: router.url } });
      }

      if (error.status >= 500) {
        void router.navigate(['/500'], { state: { referer: router.url } });
      }

      return throwError(() => error);
    })
  );
};

