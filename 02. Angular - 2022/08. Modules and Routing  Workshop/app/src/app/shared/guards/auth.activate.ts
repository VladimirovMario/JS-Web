import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthActivate implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // For parent roots    
    // const loginRequired = route.data['loginRequired'];

    const loginRequired = route.firstChild?.data['loginRequired']

    if (loginRequired === undefined) {
      return true;
    }
    if (this.authService.isLoggedIn === loginRequired) {
      return true;
    }

    // TODO Test returnUrl with edge cases 
    const parent = route.url.map(u => u.path).join('/')
    const child = route.firstChild?.url.map(u => u.path).join('/')
    const returnUrl = child? parent + `/${child}` : parent 
    // Redirection part is in Login
    return this.router.createUrlTree(['/auth/login'], {queryParams: {returnUrl}});
  }
}
