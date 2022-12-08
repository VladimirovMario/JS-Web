import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { GameModule } from './game/game.module';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

// NgModules help organize an application into cohesive blocks of functionality
@NgModule({
  // Only declarables - (components, directives and pipes)
  declarations: [AppComponent],
  // Only @NgModule classes - integrated (HttpClientModule, BrowserModule) or custom made
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    GameModule,
    SharedModule,
  ],
  providers: [], //providers - list of providers that can be injected using DI
  //The providers array Register service providers and inject them into components
  bootstrap: [AppComponent],
})
export class AppModule {}
