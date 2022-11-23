import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { IPost } from '../shared/interfaces';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent implements OnInit {
  
  posts: IPost[] | null = null;
  errorFetchingData: boolean = false;
  message!: string;


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.loadPosts(5).subscribe({
      next: (value) => {
        this.posts = value;
        console.log(value);
      },
      error: (err) => {
        this.errorFetchingData = true;
        this.message = err.message
        console.error(err);
      },
      complete: () => {
        console.log('Observer got a complete notification');
      },
    });
  }
}
