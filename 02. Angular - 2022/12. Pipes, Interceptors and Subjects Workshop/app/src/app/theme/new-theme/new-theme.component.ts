import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.scss'],
})
export class NewThemeComponent implements OnInit {
  
  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {}

  newThemeHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { themeName, postText } = form.value;

    this.themeService.createTheme(themeName, postText).subscribe(() => {
      this.router.navigate(['/theme/list']);
    });
  }
}
