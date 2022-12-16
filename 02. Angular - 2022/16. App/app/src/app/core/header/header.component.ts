import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
   get user () {
     return this.authService.user
   }

   isLoggedIn = false

   ngDoCheck(): void {
     this.isLoggedIn = this.authService.isLoggedIn;
   }

   
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
