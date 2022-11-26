import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {}

  loginHandler(): void {
    this.authService.user = {
      username: 'John',
    } as any;

    // Check auth.activate.ts
    // This is the url that the user was before login
    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/'

    this.router.navigate([returnUrl]);
  }
}
