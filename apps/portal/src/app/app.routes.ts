import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: ':lang',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'ar',
    pathMatch: 'full'
  }
];
