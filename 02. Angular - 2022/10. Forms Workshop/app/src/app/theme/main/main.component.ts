import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, DoCheck {
  // get isLoggedIn() {
  //   return this.authService.isLoggedIn;
  // }

  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
