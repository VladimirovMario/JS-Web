import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { ITheme, IPost } from './shared/interfaces';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  loadThemes() {
    return this.httpClient.get<ITheme[]>(`${apiURL}/themes`);
  }

  loadThemeById(themeId: string) {
    return this.httpClient.get<ITheme>(`${apiURL}/themes/${themeId}`);
  }

  loadPosts(limit?: number) {
    return this.httpClient.get<IPost[]>
    (`${apiURL}/posts${limit ? `?limit=${limit}` : ``}`);
  }
}
