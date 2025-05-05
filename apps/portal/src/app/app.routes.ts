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
        path: 'aboutus/aboutcenter',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'aboutus/strategicobjectives',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'aboutus/executivecommittee',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'aboutus/organizationstructure',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/initiativetoestablishandoperatenationalindustrialinformationcenter',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/industrialinformationanalysisinitiative',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/digitalservicesplatforminitiative',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/emarketplaceinitiative',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/codingofficeinitiative',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'initiatives/nationalproductregistryinitiative',
        loadComponent: () => import('./modules/content/cms-data/cms-data.component').then(m => m.CMSDataComponent)
      },
      {
        path: 'mediacenter',
        loadComponent: () => import('./modules/content/media-center/media-center.component').then(m => m.MediaCenterComponent)
      },
      {
        path: 'mediacenter/news',
        loadComponent: () => import('./modules/content/news/news.component').then(m => m.NewsComponent)
      },
      {
        path: 'mediacenter/news/:id',
        loadComponent: () => import('./modules/content/news-details/news-details.component').then(m => m.NewsDetailsComponent)
      },
      {
        path: 'aboutcenter',
        loadComponent: () => import('./modules/content/about-center/about-center.component').then(m => m.AboutCenterComponent)
      },
      {
        path: 'mediacenter/photolibrary',
        loadComponent: () => import('./modules/content/photolibrary/photolibrary.component').then(m => m.PhotolibraryComponent)
      }, 
      {
        path: 'mediacenter/videolibrary',
        loadComponent: () => import('./modules/content/videolibrary/videolibrary.component').then(m => m.VideolibraryComponent)
      },
      {
        path: 'mediacenter/events',
        loadComponent: () => import('./modules/content/events/events.component').then(m => m.EventsComponent)
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
      },
      {
        path: 'eservices',
        loadComponent: () => import('./modules/eservices/list-of-services/list-of-services.component').then(m => m.ListOfServicesComponent)
      },
      {
        path: 'eservices/:id',
        loadComponent: () => import('./modules/eservices/service-details/service-details.component').then(m => m.ServiceDetailsComponent)
      },
      {
        path: 'marsad',
        loadComponent: () => import('./modules/marsad/marsad-home/marsad-home.component').then(m => m.MarsadHomeComponent)
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
