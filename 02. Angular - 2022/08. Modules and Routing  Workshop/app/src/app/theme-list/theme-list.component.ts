import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { ITheme } from '../shared/interfaces';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss'],
})
export class ThemeListComponent implements OnInit {

  themes: ITheme[] | null = null;
  errorFetchingData: boolean = false;
  message!: string;

  constructor(private apiService: ApiService) {}

  // TODO The themes in the main section should be descending sorted by the subscribers.
  ngOnInit(): void {
    this.apiService.loadThemes().subscribe({
      next: (value) => {
        this.themes = value;
        console.log(value);
      },
      error: (err) => {
        this.errorFetchingData = true;
        this.message = err.message;
        console.error(err);
      },
      complete: () => {
        console.log('Observer got a complete notification');
      },
    });
  }
}
