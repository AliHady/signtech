import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'auth/login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },  
  {
    path: 'auth/complete-profile',
    loadComponent: () => import('./complete-profile/complete-profile.component').then(m => m.CompleteProfileComponent)
  },
  {
    path: 'auth/signup',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'auth/password-reset',
    loadComponent: () => import('./password-reset/password-reset.component').then(m => m.PasswordResetComponent)
  }
]; 