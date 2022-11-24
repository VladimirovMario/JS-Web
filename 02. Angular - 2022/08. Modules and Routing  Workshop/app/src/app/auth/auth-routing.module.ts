import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

// const routes1: Routes = [
//     {
//         path: 'auth/login',
//         component: LoginComponent
//     },
//     {
//         path: 'auth/register',
//         component: RegisterComponent
//     },
//     {
//         path: 'auth/logout',
//         component: LogoutComponent
//     },
//     {
//         path: 'auth/profile',
//         component: ProfileComponent
//     },
// ];

const routes: Routes = [
  {
    path: 'auth',

    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register',
        },
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: 'Profile',
          },
      },
    ],
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
