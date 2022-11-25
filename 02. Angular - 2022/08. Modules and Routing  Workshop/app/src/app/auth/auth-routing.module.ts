import { RouterModule, Routes } from '@angular/router';

import { AuthActivate } from '../shared/guards/auth.activate';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

// const routes1: Routes = [
//   {
//     path: 'auth/login',
//     component: LoginComponent,
//   },
//   {
//     path: 'auth/register',
//     component: RegisterComponent,
//   },
//   {
//     path: 'auth/logout',
//     component: LogoutComponent,
//   },
//   {
//     path: 'auth/profile',
//     component: ProfileComponent,
//     data: {
//       title: 'Login',
//       loginRequired: true,
//     },
//     canActivate: [AuthActivate],
//   },
// ];

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthActivate],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        data: {
          loginRequired: false,
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        data: {
          loginRequired: false,
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          loginRequired: true,
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        data: {
          loginRequired: true,
        },
      },
    ],
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
