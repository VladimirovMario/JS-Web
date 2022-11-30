import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITheme } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.scss']
})
export class ThemeDetailComponent implements OnInit {

 theme: ITheme | null = null

  constructor(private activatedRoute: ActivatedRoute) {
    // http://localhost:4200/theme/detail/5fa64a9f2183ce1728ff371a
    // TODO get real details in template
    // console.log('>>> From theme-detail.comp.ts>>>',this.activatedRoute.snapshot.data);

    this.theme = this.activatedRoute.snapshot.data['theme'];
    console.log(this.theme);
   }

  ngOnInit(): void {

  }

}
