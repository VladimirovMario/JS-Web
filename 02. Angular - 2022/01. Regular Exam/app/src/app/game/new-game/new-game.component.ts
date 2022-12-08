import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createHandler(form: NgForm){
    if (form.invalid) { return; }
    console.log(form.value);
    // { title: "Gta", genre: "test", price: 10, imageUrl: "http://local", description: "sadasdasdasdad" }
  }

}
