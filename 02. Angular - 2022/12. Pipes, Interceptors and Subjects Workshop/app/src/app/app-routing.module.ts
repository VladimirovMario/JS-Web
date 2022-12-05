import { Injectable, NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, RouterStateSnapshot, Routes, TitleStrategy} from '@angular/router';
import { Title } from '@angular/platform-browser';


import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './core/home/home.component';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Welcome to Angular training',
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    title: 'Not Found',
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'theme',
    loadChildren: ()=> import('./theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(title? `${title}  | SoftUni Forum`  :  'SoftUni Forum');
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
