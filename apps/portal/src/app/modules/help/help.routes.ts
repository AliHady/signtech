import { Route } from '@angular/router';

export const helpRoutes: Route[] = [
  
  {
    path: 'help/contactus',
    loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent)
  },

  {
    path: 'help/employment',
    loadComponent: () => import('../help/employment/employment.component').then(m => m.EmploymentComponent)
  },

  {
    path: 'help/importantlinks',
    loadComponent: () => import('./important-links/important-links.component').then(m => m.ImportantLinksComponent)
  }
]; 