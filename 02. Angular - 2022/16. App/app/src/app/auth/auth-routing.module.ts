import { RouterModule, Routes } from '@angular/router';

// TODO release the guards
import { AuthActivate } from '../shared/guards/auth.activate';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AuthActivate],
    title: 'Sign in',
    data: {
      loginRequired: false,
    },
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    // canActivate: [AuthActivate],
    title: 'Sign up',
    // data: {
    //   loginRequired: false,
    // },
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
    canActivate: [AuthActivate],
    // data: {
    //   loginRequired: true,
    // },
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    // canActivate: [AuthActivate],
    title: 'Profile',
    // data: {
    //   loginRequired: true,
    // },
  },
    
];

export const AuthRouterModule = RouterModule.forChild(routes);
