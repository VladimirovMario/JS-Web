import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { appEmailDomains } from 'src/app/shared/constants';
import { customEmailValidator, sameValueGroupValidator} from 'src/app/shared/validators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  // Validations
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, customEmailValidator(appEmailDomains)]],
    prefix: ['00359', []],
    tel: ['', []],
    pass: this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', []],
      },
      {
        validators: [sameValueGroupValidator('password', 'rePassword')],
      }
    ),
  });

  //Error message
   message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Registration form
  registerHandler() {
    if (this.registerForm.invalid) { return; }
    // console.log(this.registerForm.value);

    const { username, email, pass: { password } = {}, prefix, tel } = this.registerForm.value;

    this.authService.register(username!, email!, password!, prefix!, tel! || undefined)
    .subscribe({
      next: (user) => {
        
        this.router.navigate(['/theme/list']);        
      },
      error: (err) => {
        this.message = err.message;
        console.error('Error from register', err);
      }

    });
  }
}
