import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRouterModule } from './game-routing-module'
import { GameListComponent } from './game-list/game-list.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { NewGameComponent } from './new-game/new-game.component';
import { FormsModule } from '@angular/forms';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';


@NgModule({
  declarations: [
    GameListComponent,
    MainComponent,
    NewGameComponent,
    GameDetailComponent,
    GameEditComponent
  ],
  imports: [
    CommonModule, // For structure directives (ng if, ng for)
    SharedModule,
    FormsModule,
    GameRouterModule
  ],
  exports: [
    MainComponent
  ]
})
export class GameModule { }
