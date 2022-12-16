import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent {

  constructor(
    private gameService: GameService,
    private router: Router
    ) {}

  createHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, genre, price, imageUrl, description } = form.value;

    if (Number(price) <= 0) {
      console.error('Price must be a positive number!');
    }

    this.gameService
      .create(title, genre, price, imageUrl, description)
      .subscribe(() => {
        this.router.navigate(['game/catalog']);
      });
  }
}
