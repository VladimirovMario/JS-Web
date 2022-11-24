import { RouterModule, Routes } from '@angular/router';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';
// import { ThemeListComponent } from './theme-list/theme-list.component';

export const routes: Routes = [
  {
    path: 'theme',
    children: [
      //   {
      //     path: 'list',
      //     component: ThemeListComponent,
      //   },
      {
        path: 'new',
        component: NewThemeComponent,
      },
      {
        path: 'detail/:id',
        component: ThemeDetailComponent,
      },
    ],
  },
];

export const ThemeRouterModule = RouterModule.forChild(routes);
