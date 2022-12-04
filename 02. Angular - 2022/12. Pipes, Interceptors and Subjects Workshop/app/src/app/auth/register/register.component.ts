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
    prefix: ['00359', []],
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

  registerHandler(){
    if (this.registerForm.invalid) { return; }
    // console.log(this.registerForm.value);
    // {username: 'Johny', email: 'john.doe@gmail.com',
    //  prefix: '00359', tel: '885 888 888', pass: {password: '123456', rePassword: '123456'}}
  }
}
