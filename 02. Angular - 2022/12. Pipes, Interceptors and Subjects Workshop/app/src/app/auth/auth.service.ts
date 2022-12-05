import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, catchError, filter, of, Subscription, tap } from 'rxjs';

import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})

// The only hook that we have in services is OnDestroy
export class AuthService implements OnDestroy {

  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$
  .asObservable()
  .pipe(filter((val): val is IUser | null => val !== undefined));

  user: IUser | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => { this.user = user; });
  }

  register( username: string, email: string, password: string, prefix?: string, tel?: string ) {
    return this.http
      .post<IUser>('/api/register', { username, email, password, tel })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap(() => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<IUser>('/api/users/profile')
      .pipe(
        tap((user) => this.user$$.next(user)),
        catchError((err) =>{
          this.user$$.next(null);
          return [err]
        })
     );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}