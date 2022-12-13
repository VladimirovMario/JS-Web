import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { IGame } from '../../shared/interfaces';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: IGame[] | null = null;
  game: IGame | null = null;
  message!: string;

  isLoading: boolean = true;

  get user() {
    return this.authService.user;
  }
  // https://www.npmjs.com/package/ng2-search-filter
  // https://stackblitz.com/edit/angular-search-filter?file=app%2Fapp.component.html
  // https://betterprogramming.pub/why-and-how-to-create-an-impure-filter-pipe-in-angular-a3916de5841f
  searchText!: string;

  // TODO Search
  // form = this.formBuilder.group({});

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router
  ) // private formBuilder: FormBuilder
  {
    console.log('User', this.user);
  }

  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next: (value) => {
        this.isLoading = false;
        this.games = value;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  addToFavorite(id: string) {
    this.gameService.getById(id).subscribe({
      next: (value) => {
        this.game = value;

        // Check if user._id is different from null
        if (this.user?._id) {
          // Check if user already liked this game
          if (this.game?.users.includes(this.user?._id) == false) {
            // Making post request to database to add user id
            this.gameService
              .addGameToFavorites(this.game._id, this.user._id)
              .subscribe({
                next: (_) => {
                  // In case of success redirect to profile to see liked items
                  this.router.navigate(['/auth/profile']);
                },
              });
          } else {
            console.error('You already had liked this game!');
          }
        }
      },
      error: (err) => {
        this.message = err.message;
        console.error(this.message);
      },
      complete: () => {},
    });
  }
}
