import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';

const obj =  { title: "gta", genre: "aaa", price: 10, imageUrl: "https://", description: "dasdasd" }

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private gameService: GameService) {}

  

  ngOnInit(): void {
    this.gameService.getAll().subscribe((data) => {
      console.log(data);
    });
  }
}
