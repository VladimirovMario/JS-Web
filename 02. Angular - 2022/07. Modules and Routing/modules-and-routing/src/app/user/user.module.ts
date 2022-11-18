import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './list/list.component';
import { UserDetailComponent } from './detail/detail.component';
import { UserResolver } from './user-details-resolver';
import { AuthGuard } from './user-details-guard';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'user/list',
        component: UserListComponent,
      },
      {
        path: 'user/detail',
        component: UserDetailComponent,
      },
      {
        path: 'user/detail/:id',
        canActivate: [AuthGuard],
        resolve: {user: UserResolver},
        component: UserDetailComponent,
      },
    ]),
  ],
  exports: [UserListComponent],
})
export class UserModule {}
