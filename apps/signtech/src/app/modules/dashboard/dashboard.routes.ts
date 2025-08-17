import { Route } from '@angular/router';
import { AuthGuard } from '@signtech/core/http';

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
    path: 'dashboard/requests/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./request-details/request-details.component').then(m => m.RequestDetailsComponent)
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
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('../dashboard/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'profile/update',
    canActivate: [AuthGuard],
    loadComponent: () => import('../dashboard/update-profile/update-profile.component').then(m => m.UpdateProfileComponent)
  }
]; 