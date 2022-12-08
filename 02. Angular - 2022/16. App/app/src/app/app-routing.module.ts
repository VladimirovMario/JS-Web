import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MainComponent } from './game/main/main.component';
import { NewGameComponent } from './game/new-game/new-game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'catalog',
    component: MainComponent,
  },
  {
    path: 'create',
    component: NewGameComponent,
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
  // {
    // path: '',
    // pathMatch: 'full',
    // component: HomeComponent,
  // },
  {
    // path: 'catalog',
    // component: MainComponent,
  // },
  */
