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
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./modules/auth/signup/signup.component').then(m => m.SignupComponent)
      },
      {
        path: 'password-reset',
        loadComponent: () => import('./modules/auth/password-reset/password-reset.component').then(m => m.PasswordResetComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/auth/profile/profile.component').then(m => m.ProfileComponent)
      }
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
