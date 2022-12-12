import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IGame } from '../shared/interfaces';

const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class GameService {

 
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<IGame[]>(`${apiUrl}/game`);
  }

  getById(id: string) {
    return this.httpClient.get<IGame>(`${apiUrl}/game/` + id)
  }

  create(title: string, genre: string , price: number, imageUrl: string, description: string) {
    return this.httpClient.post(`${apiUrl}/game`, {title, genre , price, imageUrl, description});
  }

  deleteById(id: string) {
    return this.httpClient.delete<IGame>(`${apiUrl}/game/` + id)
  }

  likeGame(gameId: string, userId: string) {
    return this.httpClient.post<IGame>(`${apiUrl}/game/${gameId}/liked/${userId}`, {})
  }

}
