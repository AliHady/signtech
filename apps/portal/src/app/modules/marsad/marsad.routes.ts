import { Route } from '@angular/router';

export const marsadRoutes: Route[] = [
  {
    path: 'marsad',
    loadComponent: () => import('./marsad-home/marsad-home.component').then(m => m.MarsadHomeComponent)
  },
  {
    path: 'marsad/marsad-reports',
    loadComponent: () => import('./marsad-reports/marsad-reports.component').then(m => m.MarsadReportsComponent)
  }
]; 