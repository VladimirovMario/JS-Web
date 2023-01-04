import { Component } from '@angular/core';
import { ICustomEvent } from '../list-item/list-item.component';
import { IUser } from '../interfaces';

const myNumber = 1;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent {
  users: IUser[] = [
    {
      firstName: 'Peter',
      lastName: 'Jackson',
    },
    {
      firstName: 'John',
      lastName: 'Down',
    },
  ];

  selectedUserIndex: null | number = null;

  showLastName = true;
  myNumber = myNumber;

  get showSelectedIndex(): boolean {
    return (this.selectedUserIndex === null ? -1 : this.selectedUserIndex) >= 0;
  }

  constructor() {}

  showContent(event: MouseEvent) {
    console.log(event);
    this.showLastName = !this.showLastName;
  }

  listItemClickHandler(index: number) {
    if (this.selectedUserIndex === index) {
      this.selectedUserIndex = null;
      return;
    }
    this.selectedUserIndex = index;
  }

  customEventHandler($event: ICustomEvent){
    console.log($event);
  }

}
