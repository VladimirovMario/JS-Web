import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IGame } from 'src/app/shared/interfaces/game';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  get user() {
    return this.authService.user;
  }
  
  isLoading: boolean = true;
  games: IGame[] | null = null;  

  constructor(
    private apiService: ApiService,
    private authService: AuthService) {}

  ngOnInit(): void {
 
    this.apiService.getUserFavorites(this.user?._id || ``).subscribe({
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
