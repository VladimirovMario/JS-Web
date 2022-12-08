import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

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
];

export const GameRouterModule = RouterModule.forChild(routes);
