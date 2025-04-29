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
      },
      {
        path: 'news',
        loadComponent: () => import('./modules/content/news/news/news.component').then(m => m.NewsComponent)
      },
      // You can add more child routes here as needed
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
