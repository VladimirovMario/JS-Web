import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appEmailDomains } from 'src/app/shared/constants';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss'],
})
export class LoginComponent implements OnInit {

  appEmailDomains = appEmailDomains

  // @ViewChild(
  //   // 'loginForm',
  //    NgForm,
  //    { static: true }) 
  //    loginForm!: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {}

  loginHandler(form: NgForm): void {

    if (form.invalid) { return; }
    // console.log(form.value);
    // {email: 'john.doe@gmail.com', password: '123456'}

    
    this.authService.user = {
      username: 'John',
    } as any;

    // Check auth.activate.ts
    // This is the url that the user was before login
    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
