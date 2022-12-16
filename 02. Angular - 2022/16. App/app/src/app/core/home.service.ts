import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IGame } from '../shared/interfaces';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

    getLatestsGames(limit?: number) {
    return this.httpClient.get<IGame[]>(`${apiURL}/${limit ? `?limit=${limit}` : ``}`);
  }
}
