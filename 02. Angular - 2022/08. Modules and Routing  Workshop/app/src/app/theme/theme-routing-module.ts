import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';

export const routes: Routes = [
  {
    path: 'theme',
    children: [
      {
        path: 'list',
        component: MainComponent,
        title: 'Themes'
      },
      {
        path: 'new',
        component: NewThemeComponent,
        title: 'Add Theme'
      },
      {
        path: 'detail/:id',
        component: ThemeDetailComponent,
        // TODO add title
      },
    ],
  },
];

export const ThemeRouterModule = RouterModule.forChild(routes);
