import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
   | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.authService.user$.pipe(
      take(1),
      map(user => {
    // For parent roots
    // const loginRequired = route.data['loginRequired'];
    const loginRequired = route.firstChild?.data['loginRequired'];

    if (loginRequired === undefined || !!user === loginRequired) {
      return true;
    }
    // TODO Test returnUrl with edge cases
    // (Don't work after last changes)
    const parent = route.url.map(u => u.path).join('/')
    const child = route.firstChild?.url.map(u => u.path).join('/')
    const returnUrl = child? parent + `/${child}` : parent
    // Redirection part is in Login
    return !!user ? this.router.createUrlTree(['/theme/list'], {queryParams: {returnUrl}})
    : this.router.createUrlTree(['/auth/login'], {queryParams: {returnUrl}});
      })
    )
  }
}
