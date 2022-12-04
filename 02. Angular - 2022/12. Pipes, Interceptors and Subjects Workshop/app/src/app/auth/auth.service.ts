import { Injectable } from '@angular/core';

import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: IUser | null = {
     username: 'John',
     email: 'john.doe@gmail.com',
     tel: '00359885885885'
    } as any;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor() {}
}
