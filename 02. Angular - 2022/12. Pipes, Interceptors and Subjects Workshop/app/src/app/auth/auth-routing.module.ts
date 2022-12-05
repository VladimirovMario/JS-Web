import { RouterModule, Routes } from '@angular/router';

import { AuthActivate } from '../shared/guards/auth.activate';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthActivate],
    title: 'Login',
    data: {
      loginRequired: false,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthActivate],
    title: 'Register',
    data: {
      loginRequired: false,
    },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthActivate],
    data: {
      loginRequired: true,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
    title: 'Profile',
    data: {
      loginRequired: true,
    },
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
