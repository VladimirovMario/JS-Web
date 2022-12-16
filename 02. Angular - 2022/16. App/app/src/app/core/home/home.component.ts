import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { IGame } from 'src/app/shared/interfaces';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  get isLoggedIn(){
    return localStorage.getItem('token');
    // return this.authService.isLoggedIn
  }

  games: IGame[] | null = null;

  limit: number = 3;

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeService.getLatestsGames(this.limit).subscribe({
      next: (value) => {
        // this.isLoading = false;
        this.games = value;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }
}
