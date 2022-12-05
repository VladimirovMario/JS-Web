import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITheme } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private httpClient: HttpClient) { }

  getAllThemes() {
    return this.httpClient.get<ITheme[]>('/api/themes');
  }
 
  getTheme(id: string) {
    return this.httpClient.get<ITheme>('/api/themes/' + id);
  }

  createTheme(name: string, text: string) {
    return this.httpClient.post<ITheme>('/api/themes/', { themeName: name, postText: text });
  }

  updateTheme(id: string, name: string, text: string) {
    return this.httpClient.put<ITheme>('/api/themes/' + id, { themeName: name, postText: text });
  }

  deleteThemePost(themeId: string, postId: string) {
    return this.httpClient.delete<ITheme>('/api/themes/' + themeId + '/post' + postId);
  }
}