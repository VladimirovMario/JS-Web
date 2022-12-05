import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  isAuthenticating: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
       
        this.isAuthenticating = false;
      },
      error: (err) => {
        // this.authService.user = null;
        this.isAuthenticating = false;
        console.error('Error from profile', err.message);
      },
    })
  }

}
