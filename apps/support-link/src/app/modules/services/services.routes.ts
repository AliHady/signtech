import { Route } from '@angular/router';

export const servicesRoutes: Route[] = [
  {
    path: 'services',
    loadComponent: () => import('./list-of-services/list-of-services.component').then(m => m.ListOfServicesComponent)
  },
  {
    path: 'services/:id',
    loadComponent: () => import('./service-details/service-details.component').then(m => m.ServiceDetailsComponent)
  }
]; 