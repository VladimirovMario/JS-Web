import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class UserResolver implements Resolve<IUser> {
  
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IUser | Observable<IUser> | Promise<IUser> {
    return this.userService.loadUser(route.params['id']);
  }
}
