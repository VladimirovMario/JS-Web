import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { GameModule } from './game/game.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { appInterceptorProvider } from './app.interseptor';

import { API_ERROR } from './shared/constants';
import { BehaviorSubject } from 'rxjs';
import { AuthenticateComponent } from './authenticate/authenticate.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AppComponent, AuthenticateComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    GameModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  providers: [
    appInterceptorProvider,
    {
      provide: API_ERROR,
      useValue: new BehaviorSubject(null),
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
