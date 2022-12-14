import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, filter, Subscription, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUser } from '../shared/interfaces';

 
@Injectable({
  providedIn: 'root',
})

export class AuthService implements OnDestroy{

  private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
  user$ = this.user$$
  .asObservable()
  .pipe(filter((val): val is IUser | null => val !== undefined));

  user: IUser | null = null;

  get isLoggedIn() {
    // return localStorage.getItem('token');
    return this.user !== null;
  }

  subscription: Subscription;


  constructor(private httpClient: HttpClient) {
    this.subscription = this.user$.subscribe((user) => { this.user = user; });
  }

  register(email: string, username: string, tel: string, password: string, rePassword: string){
    return this.httpClient
    .post<IUser>(`/api/user/register`, {email, username, tel, password, rePassword})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string){
    return this.httpClient
    .post<IUser>(`/api/user/login`, {email, password})
    .pipe(tap((user) => this.user$$.next(user)));
  }

  logout(){
    return this.httpClient
    .get('/api/user/logout', {})
    .pipe(tap(() => this.user$$.next(null)));
  }

  // Steel not working
  getProfile() {
    return this.httpClient.get<IUser>('/api/user/profile')
    .pipe(tap((user) => this.user$$.next(user)),
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
