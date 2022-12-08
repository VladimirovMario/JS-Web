import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { GameModule } from './game/game.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

// NgModules help organize an application into cohesive blocks of functionality
@NgModule({
  // Only declarables - (components, directives and pipes)
  declarations: [AppComponent],
  // Only @NgModule classes - integrated (HttpClientModule, BrowserModule) or custom made
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    GameModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [], //providers - list of providers that can be injected using DI
  //The providers array Register service providers and inject them into components
  bootstrap: [AppComponent],
})
export class AppModule {}
