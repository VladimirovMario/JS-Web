import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function createMyValidator(config: number): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.length >= config ? { createMyValidator: true , message: 'Test'} : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, createMyValidator(10)]],
    password: ['', [Validators.required, Validators.maxLength(8)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleFormSubmit(): void {}
}
