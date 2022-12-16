import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    tel: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rePassword: ['', [Validators.required]],
  });

  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

   registerHandler() {
    if (this.form.invalid) { return; }

    const { email, username, tel, password, rePassword } = this.form.value;
    // TODO fix Errors!
    if (password !== rePassword) {
      console.error("Passwords don't match");
    }

    this.authService
      .register(email!, username!, tel!, password!, rePassword!)
      .subscribe({
        next: (user) => {
          this.authService.user = user;
          this.router.navigate(['/game/catalog']);
        },
        error: (err) => {
          this.message = err.message;
          console.error(this.message);
        },
      });
  }
}
