import { Route } from '@angular/router';
import { homeRoutes } from './modules/home/home.routes';
import { contentRoutes } from './modules/content/content.routes';
import { eservicesRoutes } from './modules/eservices/eservices.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { marsadRoutes } from './modules/marsad/marsad.routes';

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
      ...marsadRoutes
    ]
  },
  {
    path: '',
    redirectTo: 'ar',  // Default redirect if no lang is provided
    pathMatch: 'full'
  },
  {
    path: '**',  // Wildcard route to handle invalid paths (optional)
    redirectTo: 'ar'
  }
];
