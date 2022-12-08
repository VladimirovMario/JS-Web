import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRouterModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRouterModule
  ]
})
export class AuthModule { }
