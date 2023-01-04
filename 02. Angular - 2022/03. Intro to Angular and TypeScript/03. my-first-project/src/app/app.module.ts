import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';

// An NgModule class describes how the application parts fit together
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  // Template specific items
  // The declarations array: 
  // Only declarables – (components, directives and pipes)
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent
  ],
  // The imports array:
  // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
  imports: [
    BrowserModule // this includes CommonModule
  ],
  // The providers array: 
  // Register service providers and inject them into components 
  providers: [], // use Dependance Injection (from app.component class constructor)
  // The bootstrap array:
  // The root component - used to launch the application.
  // Inserting a bootstrapped component usually triggers a cascade of component creation
  bootstrap: [AppComponent]
})
// It is used to bootstrap (launch) the application
// Usually it is called AppModule, but it is not necessary
export class AppModule { }
