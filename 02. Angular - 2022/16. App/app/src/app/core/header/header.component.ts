import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  user: IUser | null = null;

  get isLoggedIn() {
    return this.user !== null;
  }

  constructor() {}

  ngOnInit(): void {}
}
