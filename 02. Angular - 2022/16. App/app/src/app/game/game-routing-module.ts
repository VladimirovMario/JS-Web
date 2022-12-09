import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';

export const routes: Routes = [
  {
    path: 'game/catalog',
    component: MainComponent,
    title: 'Our Games Catalog',
  },
  {
    path: 'game/create',
    component: NewGameComponent,
    title: 'Add Game' 
  },
  {
    path: 'game/detail/:id',
    component: GameDetailComponent,
    title: 'Details'
  },
  {
    path: 'game/detail/edit/:id',
    component: GameEditComponent,
    title: 'Edit'
  },
];

export const GameRouterModule = RouterModule.forChild(routes);
