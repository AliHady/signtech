import { Route } from '@angular/router';

export const eservicesRoutes: Route[] = [
  {
    path: 'eservices',
    loadComponent: () => import('./list-of-services/list-of-services.component').then(m => m.ListOfServicesComponent)
  },
  {
    path: 'eservices/:id',
    loadComponent: () => import('./service-details/service-details.component').then(m => m.ServiceDetailsComponent)
  }
]; 