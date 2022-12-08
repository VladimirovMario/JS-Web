import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list/game-list.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { NewGameComponent } from './new-game/new-game.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GameListComponent,
    MainComponent,
    NewGameComponent
  ],
  imports: [
    CommonModule, // For structure directives (ng if, ng for)
    SharedModule,
    FormsModule,
  ],
  exports: [
    MainComponent
  ]
})
export class GameModule { }
