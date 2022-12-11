import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IGame } from 'src/app/shared/interfaces/game';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  
  isLoading: boolean = true;
  games: IGame[] | null = null;
  limit: number = 2;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatestsGames(this.limit).subscribe({
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
}
