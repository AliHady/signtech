import { Route } from '@angular/router';

export const eservicesRoutes: Route[] = [
  {
    path: 'eservices',
    loadComponent: () => import('./list-of-services/list-of-services.component').then(m => m.ListOfServicesComponent)
  },
  {
    path: 'eservices/applytotarmeez',
    loadComponent: () => import('./apply-to-tarmeez/apply-to-tarmeez.component').then(m => m.ApplyToTarmeezComponent)
  },

  {
    path: 'eservices/searchforncage',
    loadComponent: () => import('./search-for-ncage/search-for-ncage.component').then(m => m.SearchForNcageComponent)
  },
  {
    path: 'eservices/requestcode',
    loadComponent: () => import('./request-code/request-code.component').then(m => m.RequestCodeComponent)
  },
  {
    path: 'eservices/datarequest',
    loadComponent: () => import('./data-request/data-request.component').then(m => m.DataRequestComponent)
  },
  {
    path: 'eservices/senai',
    loadComponent: () => import('./senai/senai.component').then(m => m.SenaiComponent)
  },
  {
    path: 'eservices/:id',
    loadComponent: () => import('../content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
  }
]; 