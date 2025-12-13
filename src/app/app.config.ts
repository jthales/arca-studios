import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { apiBaseInterceptor } from './core/interceptors/api-base.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([apiBaseInterceptor, httpErrorInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: environment.defaultLocale }
  ]
};
