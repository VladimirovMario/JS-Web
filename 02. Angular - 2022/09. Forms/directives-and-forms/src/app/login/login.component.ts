import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;
  
  constructor() { }

  ngOnInit(): void {
    // this.loginForm.valueChanges?.subscribe(console.log)
  }


  handleFormSubmit(form: NgForm): void {

    if (form.invalid){ return; }

    const value: {email: string, password: string} = form.value;
    console.log(value);

    // After a form is submitted resetting is necessary to clear all
    // input fields and reset the track state
    form.setValue({email: `${value.email}`, password: ''});
    // form.reset();

    
    console.log(form);
  }

}
