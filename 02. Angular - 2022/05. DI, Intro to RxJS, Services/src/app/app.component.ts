import { Component, Inject, Optional } from '@angular/core';
import { MyClass, myCustomToken} from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // counter = 0;

  users = [
    {
      username: 'Peter',
    },
    {
      username: 'John',
    },
  ];

  constructor(
    @Optional() @Inject(myCustomToken) test1: string,
    
    // @Inject(MyClass) test: MyClass === test: MyClass
    test: MyClass
  ) {
    console.log(test);
    // setInterval(()=>{this.counter++},3000)
  }

  // Handlers must be after the constructor
  addUserHandler(nameInput: HTMLInputElement): void {
    const { value } = nameInput;
    // this.users.push({ username: value });
    this.users = this.users.concat({ username: value });
    nameInput.value = ``;

    console.log('>>> From app.component.ts value>>>', value);
    console.log('>>> From app.component.ts nameInput>>>', nameInput);

  }
}
