import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';
import { IGame } from '../../shared/interfaces';

const mockData = [
  {
    _id: '1232131313',
    title: 'gta',
    genre: 'aaa',
    price: 10,
    imageUrl: '../../../assets/img/ps4/pngwing.com.png',
    description: 'dasdasd',
  },
  {
    _id: '1232131313',
    title: 'test',
    genre: 'aaa',
    price: 20,
    imageUrl: 'https://',
    description: 'dasdasd',
  },
];

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

  games : IGame[] | null = null ;
  isLoading: boolean = true;


  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next: (value) => {
        this.isLoading = false;

        this.games as any; 
        this.games = mockData as any
        console.log('form back end', value);
      },
      error: (err) => {
          console.error(err);
      },
      complete: () => {
        console.log('Observer got a complete notification');
      },
    });
  }
}
