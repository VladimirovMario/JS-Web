import {HttpEvent, HttpHandler, HttpInterceptor,
   HttpRequest,HTTP_INTERCEPTORS} from '@angular/common/http';

import { Inject, Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, Observable, of,
  switchMap, take, throwError, zip} from 'rxjs';

import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { API_ERROR } from './shared/constants';

const apiURL = environment.apiURL;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  // Setting the token!!!
  get user() {
    return this.authService.user;
  }

  constructor(
    @Inject(API_ERROR)
    private apiError: BehaviorSubject<Error | null>,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Setting the token!!!
    this.user ? localStorage.setItem('token', this.user?.token!) : localStorage.removeItem('token');
    const token: string | null = localStorage.getItem('token');

    req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });


    if (req.url.startsWith('/api')) {
      req = req.clone({url: req.url.replace('/api', apiURL), withCredentials: true});
    }

    return next.handle(req).pipe(
      catchError((err) =>
        of(err).pipe(
          switchMap((err) => {
            if (err.status === 401) {
              return [[err, null]];
            }
            return zip([err], this.authService.user$).pipe(take(1));
          }),
          switchMap(([err, user]) => {
            if (err.status === 401) {
              if (!user) {
                this.router.navigate(['/']);
              } else {
                this.router.navigate(['/']);
              }
            } else {
              this.apiError.next(err);
              this.router.navigate(['/error']);
            }
            return throwError(() => err);
          })
        )
      )
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
