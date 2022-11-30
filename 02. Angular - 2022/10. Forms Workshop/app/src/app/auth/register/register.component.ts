import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { appEmailDomains } from 'src/app/shared/constants';
import { customEmailValidator, sameValueGroupValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, customEmailValidator(appEmailDomains)]],
    ['select-tel']: ['00359', []],
    tel: ['', []],
    pass: this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', []],
      },
      {
        validators: [sameValueGroupValidator('password', 'rePassword')]
      }
    ),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
