import { Route } from '@angular/router';
import { homeRoutes } from './modules/home/home.routes';
import { contentRoutes } from './modules/content/content.routes';
import { eservicesRoutes } from './modules/eservices/eservices.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { marsadRoutes } from './modules/marsad/marsad.routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerDownComponent } from './shared/components/server-down/server-down.component';

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
      ...eservicesRoutes,
      ...authRoutes,
      ...marsadRoutes,
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
    redirectTo: 'ar/home',  // Default redirect if no lang is provided
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ar/404'  // Redirect to 404 with default language
  }
];
