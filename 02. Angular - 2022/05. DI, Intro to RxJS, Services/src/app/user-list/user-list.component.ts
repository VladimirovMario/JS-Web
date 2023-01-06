import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: any[];
  isLoading: boolean = true;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getUsers().subscribe((res) => {
      this.isLoading = false;
      this.users = res;
    });
  }
}
