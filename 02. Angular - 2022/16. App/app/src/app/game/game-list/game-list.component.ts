import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { IGame } from '../../shared/interfaces';
// import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: IGame[] | null = null;
  isLoading: boolean = true;

  // TODO Search
  // form = this.formBuilder.group({});

  constructor(
    private gameService: GameService
    // private formBuilder: FormBuilder
    ) 
  {}

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
