import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IGame } from './shared/interfaces';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}


  getUserFavorites(userId: string) {
    return this.httpClient.get<IGame[]>(`${apiURL}/game/liked/${userId}`);
  }

  // getLatestsGames(limit?: number) {
  //   return this.httpClient.get<IGame[]>(`${apiURL}/${limit ? `?limit=${limit}` : ``}`);
  // }

  // getById(id: string) {
  //   return this.httpClient.get<IGame>(`${apiURL}/game/` + id)
  // }
}
