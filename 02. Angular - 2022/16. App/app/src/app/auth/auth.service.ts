import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';

const apiUrl = environment.apiURL;

// const headers = new HttpHeaders()
// .set('content-type', 'application/json')
// .set('x-functions-key', '');
// headers.append('Access-Control-Allow-Origin', '*')
// headers.append('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
// headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

 


  register<IUser>(email: string, username: string, tel: string, password: string){
    return this.httpClient.post<IUser>(`${apiUrl}/auth/register`, {email, username, tel, password})
  }

}
