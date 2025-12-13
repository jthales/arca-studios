import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = environment.apiBaseUrl;
  if (!apiBaseUrl || /^https?:\/\//i.test(req.url) || req.url.startsWith('/assets')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${apiBaseUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`,
    setHeaders: {
      'X-Requested-With': 'AngularHttpClient',
      'X-Arca-Client': 'arca-studios-web'
    }
  });
  return next(apiReq);
};

