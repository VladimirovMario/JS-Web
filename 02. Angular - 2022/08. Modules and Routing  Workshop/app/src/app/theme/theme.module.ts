import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRouterModule } from './theme-routing-module';
import { SharedModule } from '../shared/shared.module';

import { ThemeListComponent } from './theme-list/theme-list.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';



@NgModule({
  declarations: [
    ThemeListComponent,
    NewThemeComponent,
    ThemeDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ThemeRouterModule
  ],
  exports: [
    ThemeListComponent
  ]
})
export class ThemeModule { }
