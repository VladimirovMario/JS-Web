import { NgModule, Provider, InjectionToken, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { UserListComponent } from './user-list/user-list.component';
// import { UserService } from './user.service';

import { HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class MyClass {
  constructor() {
    console.log(this, `Nameless class was constructed.`);
  }
}

export const myCustomToken = new InjectionToken('Test');

const myProvider: Provider = {
  provide: myCustomToken,

   useClass: MyClass,
  //  provide: MyClass
};

@NgModule({
  declarations: [AppComponent, TestComponent, UserListComponent],
  imports: [
    BrowserModule,
    HttpClientModule
  ],

  providers: [
    MyClass, // => { useClass: MyClass, provide: MyClass }
    myProvider,
    
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
