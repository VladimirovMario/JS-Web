import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


import { API_ERROR } from './shared/constants';
const apiURL = environment.apiURL;

// Automatically attach authentication information to requests

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  // constructor( @Inject(API_ERROR)) {}
  constructor( ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiURL),
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json',
          'Headers': 'x-authorization',
        },
      });
    }

    return next.handle(req);
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
