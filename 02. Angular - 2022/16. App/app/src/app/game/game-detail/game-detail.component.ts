import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from 'src/app/shared/interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: IGame | null = null;
  id!: string;
  message!: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {
    this.id = this.activateRoute.snapshot.params?.['id'];
    // console.log(this.activateRoute.snapshot);
  }

  ngOnInit(): void {
    this.gameService.getById(this.id).subscribe({
      next: (value) => {
        this.game = value;
        console.log(value);
      },
      error: (err) => {
        this.message = err.message;
        console.error('>>> From details ', this.message);
      },
      complete: () => {
        console.log('Observer got a complete notification');
      },
    });
  }

  deleteHandler() {
    this.gameService.deleteById(this.id).subscribe({
      next: (_) => {
        this.router.navigate(['/game/catalog']);
      },
      error: (err) => {
        this.message = err.message;
        console.error('>>> Delete ', this.message);
      },
    });
  }
}
