import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-project';

  changeTitleHandler(event: MouseEvent, newTitle: string){
    console.log(event);
    this.title = newTitle
  }
}
