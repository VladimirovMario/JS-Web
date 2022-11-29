import { Component, Inject } from '@angular/core';
import { MyValueInjectionToken } from './providers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'directives-and-forms';


  myIfValue: boolean = true

  constructor(@Inject(MyValueInjectionToken) myValue: string){
    console.log(myValue);
  }

}
