import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IGame } from 'src/app/shared/interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {

  get isLoggedIn() {
    return localStorage.getItem('token');
    // return this.authService.isLoggedIn;
  }

  get user() {
    return this.authService.user;
  }

  game: IGame | null = null;
  id!: string;
  message!: string;

  constructor(
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.params?.['id'];
    //  console.log(this.activateRoute.snapshot);
  }

  ngOnInit(): void {
    this.gameService.getById(this.id).subscribe({
      next: (value) => {
        this.game = value;
      },
      error: (err) => {
        this.message = err.message;
        console.error(this.message);
      },
      complete: () => {},
    });
  }

  addHandler() {
    this.gameService.getById(this.id).subscribe({
      next: (value) => {
        this.game = value;

        // Check if user._id is different from null
        if (this.user?._id) {

          // Check if user already liked this game
          if (this.game?.users.includes(this.user?._id) == false) {
            
            // Making post request to database to add user id
            this.gameService.addGameToFavorites(this.game._id).subscribe({
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

  deleteHandler() {
    // TODO Make modal to ensure user really want to delete this item
    this.gameService.deleteById(this.id).subscribe({
      next: (_) => {
        this.router.navigate(['/game/catalog']);
      },
      error: (err) => {
        this.message = err.message;
        console.error(this.message);
      },
    });
  }
}
