import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IGame } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {

 
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<IGame[]>('/api/game');
  }

  create(title: string, genre: string , price: number, imageUrl: string, description: string) {
    return this.httpClient.post('/api/game', {title, genre , price, imageUrl, description});
  }

  getById(id: string) {
    return this.httpClient.get<IGame>('/api/game/' + id);
  }

  updateById(id: string, title: string, genre: string , price: number, imageUrl: string, description: string) {
    return this.httpClient.put<IGame>('/api/game/' + id, {title, genre , price, imageUrl, description});
  }

  deleteById(id: string) {
    return this.httpClient.delete<IGame>('/api/game/' + id);
  }

  addGameToFavorites(gameId: string) {
    return this.httpClient.post<IGame>(`/api/game/liked/${gameId}`, {});
  }

}
