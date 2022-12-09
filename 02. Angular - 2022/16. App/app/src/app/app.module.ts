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



@NgModule({
  
  declarations: [AppComponent],
 
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    GameModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [appInterceptorProvider], 


  bootstrap: [AppComponent],
})
export class AppModule {}
