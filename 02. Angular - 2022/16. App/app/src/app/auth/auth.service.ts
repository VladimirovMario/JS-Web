import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';
 
const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  register(email: string, username: string, tel: string, password: string, rePassword: string){
    return this.httpClient.post<IUser>(`/api/register`,
     {email, username, tel, password, rePassword});
  }

  login(email: string, password: string){
    return this.httpClient.post<IUser>(`/api/login`, {email, password});
  }

  logout(){
    return this.httpClient.post('/api/logout', {});
  }
}
