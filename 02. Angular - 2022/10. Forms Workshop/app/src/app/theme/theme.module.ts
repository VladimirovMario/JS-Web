import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThemeRouterModule } from './theme-routing-module';
import { SharedModule } from '../shared/shared.module';

import { ThemeListComponent } from './theme-list/theme-list.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';
import { MainComponent } from './main/main.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';

@NgModule({
  declarations: [
    ThemeListComponent,
    NewThemeComponent,
    ThemeDetailComponent,
    MainComponent,
    RecentPostsComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    FormsModule, 
    ThemeRouterModule
  ],
  exports: [ThemeListComponent],
})
export class ThemeModule {}
