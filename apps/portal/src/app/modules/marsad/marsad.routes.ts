import { Route } from '@angular/router';

export const marsadRoutes: Route[] = [
  {
    path: 'marsad',
    loadComponent: () => import('./marsad-home/marsad-home.component').then(m => m.MarsadHomeComponent)
  }
]; 