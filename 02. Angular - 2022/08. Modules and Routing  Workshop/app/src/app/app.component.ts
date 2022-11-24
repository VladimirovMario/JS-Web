import { Component } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
   // If you want to see the events occur in the following sequence:
   // this.router.events.pipe(map(e=>e),tap(console.log)).subscribe(()=>{})
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data + ' - SoftUni Forum');
        }
      });
  }
}
