import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  get isLoggedIn () {
    return localStorage.getItem('token');
    // return this.authService.isLoggedIn;
   }
  
   get user () {
     return this.authService.user
   }

   
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
