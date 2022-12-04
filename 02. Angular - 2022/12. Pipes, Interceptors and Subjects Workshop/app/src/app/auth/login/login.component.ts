import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appEmailDomains } from 'src/app/shared/constants';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss'],
})
export class LoginComponent {

  appEmailDomains = appEmailDomains

  message!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  
  loginHandler(form: NgForm): void {
    if (form.invalid) { return; }
  
    const { email, password } = form.value

    this.authService.login(email, password )
    .subscribe({
      next: (user) => {
        // console.log(user);
        this.authService.user = user;
        this.router.navigate(['/theme/list'])
      },
      error: (err) => {
        this.message = err.message;
        console.error('Error from login', this.message);
      }

    });
    
    // Check auth.activate.ts
    // This is the url that the user was before login
    // const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    // this.router.navigate([returnUrl]);
  }
}
