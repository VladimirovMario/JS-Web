import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginHandler(){
    // if (this.form.invalid) { return; }
    const { email,  password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: (user) => {
        this.router.navigate(['/game/catalog']);
      },
      error: (err) => {
        console.error('Error from register', err.message);
      }
    });

    console.log(this.form.value);
  }

}
