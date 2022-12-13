import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from 'src/app/shared/interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent implements OnInit {

  game: IGame | null = null;
  id!: string;
  message!: string;

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    genre: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required]],
    imageUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.params?.['id'];
  }

  ngOnInit(): void {
    this.gameService.getById(this.id).subscribe({
      next: (value) => {
        this.game = value;
        //.patchValue() Replace any properties defined in the object that have changed in the form model.
        this.form.patchValue(this.game as any);
      },
      error: (err) => {
        this.message = err;
        console.error(this.message);
      },
    });
  }

  // TODO fix errors
  editHandler() {
    if (this.form.invalid) { return; }
    const { title, genre, price, imageUrl, description } = this.form.value;

    if (Number(price) <= 0.01) {
      console.error('Price must be a positive number!');
    }

    this.gameService
      .updateById(this.id, title!, genre!, price!, imageUrl!, description!)
      .subscribe({
        next: (_) => {
          this.router.navigate([`/game/detail/${this.id}`]);
        },
        error: (err) => {
          this.message = err;
          console.error(this.message);
        },
      });
  }

  cancelEditMode() {
    this.form.reset();
    this.router.navigate([`/game/detail/${this.id}`]);
  }
}
