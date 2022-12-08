import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    title: 'Register Page'
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
    
  },
];

export const AuthRouterModule = RouterModule.forChild(routes);
