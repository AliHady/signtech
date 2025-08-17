import { Route } from '@angular/router';
import { homeRoutes } from './modules/home/home.routes';
import { contentRoutes } from './modules/content/content.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerDownComponent } from './shared/components/server-down/server-down.component';
import { servicesRoutes } from './modules/services/services.routes';
import { DashboardRoutes } from './modules/dashboard/dashboard.routes';

export const appRoutes: Route[] = [
  {
    path: ':lang',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      ...homeRoutes,
      ...contentRoutes,
      ...servicesRoutes,
      ...authRoutes,
      ...DashboardRoutes,
      {
        path: 'server-down',
        component: ServerDownComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'en/home',  // Default redirect if no lang is provided
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ar/404'  // Redirect to 404 with default language
  }
];
