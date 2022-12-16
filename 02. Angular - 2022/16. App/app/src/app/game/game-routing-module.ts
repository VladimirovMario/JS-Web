import { RouterModule, Routes } from '@angular/router';

import { AuthActivate } from '../shared/guards/auth.activate';

import { MainComponent } from './main/main.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';

export const routes: Routes = [
  {
    path: 'game/catalog',
    component: MainComponent,
    title: 'Explore Categories',
  },
  {
    path: 'game/create',
    component: NewGameComponent,
    canActivate: [AuthActivate],
    title: 'Create Game',
    data: {
      loginRequired: true,
    },
  },
  {
    path: 'game/detail/:id',
    component: GameDetailComponent,
    title: 'Details',
  },
  {
    path: 'game/detail/edit/:id',
    component: GameEditComponent,
    canActivate: [AuthActivate],
    title: 'Edit',
    data: {
      loginRequired: true,
    },
  },
];

export const GameRouterModule = RouterModule.forChild(routes);
