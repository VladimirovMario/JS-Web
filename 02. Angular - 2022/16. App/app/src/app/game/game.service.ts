import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class GameService {

  userId: string = '123' 

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(`${apiUrl}/game`);
  }

  create(title: string, genre: string , price: number, imageUrl: string, description: string) {
    return this.httpClient.post(`${apiUrl}/game`,
     {title, genre , price, imageUrl, description});
  }
}
