import { Component, OnInit } from '@angular/core';

import { IGame } from 'src/app/shared/interfaces';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  get isLoggedIn() {
    return localStorage.getItem('token');
  }

  games: IGame[] | null = null;
  limit: number = 3;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getLatestsGames(this.limit).subscribe({
      next: (value) => {      
        this.games = value;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }
}
