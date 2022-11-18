import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsListComponent } from './post/posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user/list',
  },
  {
    path: 'posts-list',
    component: PostsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
