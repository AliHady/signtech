import { Route } from '@angular/router';

export const homeRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent)
  }
]; 