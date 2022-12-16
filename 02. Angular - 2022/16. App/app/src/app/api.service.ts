import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IGame } from './shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  getUserFavorites(userId: string) {
    return this.httpClient.get<IGame[]>(`/api/game/liked/${userId}`);
  }
}
