import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {}

  createHandler(form: NgForm) {
    // if (form.invalid) { return; }
   
    
    // { title: "gta", genre: "aaa", price: 10, imageUrl: "https://", description: "dasdasdasdasda" }

    const { title, genre, price, imageUrl, description } = form.value;

    if (price <= 0) {
      // throw new Error('Price must be a positive number!');      
      console.error('Price must be a positive number!');
    }

    this.gameService
      .create(title, genre, price, imageUrl, description)
      .subscribe(() => {
        this.router.navigate(['game/catalog']);
      });
  }
}
