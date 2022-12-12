import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { IGame } from '../../shared/interfaces';
import { AuthService } from 'src/app/auth/auth.service';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: IGame[] | null = null;
  isLoading: boolean = true;

  get user () {
    return this.authService.user
  }

  // TODO Search
  // form = this.formBuilder.group({});

  constructor(
    private gameService: GameService,
    private authService: AuthService
    // private formBuilder: FormBuilder
    ) 
  {


    console.log('test' ,this.user);

    console.log(JSON.parse(localStorage.getItem(this.user as any) as any));


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

  addToFavorite() {
    // TODO add to favorite list!!!
  }
}
