import { Route } from '@angular/router';
import { AuthGuard } from '@support-link/core/http';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
  },
  {
    path: 'dashboard/requests',
    canActivate: [AuthGuard],
    loadComponent: () => import('./my-requests/my-requests.component').then(m => m.MyRequestsComponent)
  },
  {
    path: 'dashboard/requests/new',
    canActivate: [AuthGuard],
    loadComponent: () => import('./new-request/new-request.component').then(m => m.NewRequestComponent)
  },
  {
    path: 'dashboard/notifications',
    canActivate: [AuthGuard],
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'dashboard/settings',
    canActivate: [AuthGuard],
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  }
]; 