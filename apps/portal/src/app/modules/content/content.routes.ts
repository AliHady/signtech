import { Route } from '@angular/router';

export const contentRoutes: Route[] = [
  // About Us Routes
  {
    path: 'aboutus',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'aboutus/aboutcenter',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'aboutus/strategicobjectives',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'aboutus/executivecommittee',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'aboutus/organizationstructure',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  // Initiatives Routes
  {
    path: 'initiatives',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/initiativetoestablishandoperatenationalindustrialinformationcenter',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/industrialinformationanalysisinitiative',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/digitalservicesplatforminitiative',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/emarketplaceinitiative',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/codingofficeinitiative',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'initiatives/nationalproductregistryinitiative',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  // Products Routes
  {
    path: 'products/periodicreports',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/indicators',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/indicators/industryindicators',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/indicators/miningindicators',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/report',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/bulletin',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/bulletin/monthlybulletin',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/periodicreports/bulletin/quarterlybulletin',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/studiesandresearch',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/consulting',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  {
    path: 'products/cognitiveactivities',
    loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
  },
  // Media Center Routes
  {
    path: 'mediacenter',
    loadComponent: () => import('./media-center/media-center.component').then(m => m.MediaCenterComponent)
  },
  {
    path: 'mediacenter/news',
    loadComponent: () => import('./news/news.component').then(m => m.NewsComponent)
  },
  {
    path: 'mediacenter/news/:id',
    loadComponent: () => import('./news-details/news-details.component').then(m => m.NewsDetailsComponent)
  },
  {
    path: 'aboutcenter',
    loadComponent: () => import('./about-center/about-center.component').then(m => m.AboutCenterComponent)
  },
  {
    path: 'mediacenter/photolibrary',
    loadComponent: () => import('./photolibrary/photolibrary.component').then(m => m.PhotolibraryComponent)
  },
  {
    path: 'mediacenter/videolibrary',
    loadComponent: () => import('./videolibrary/videolibrary.component').then(m => m.VideolibraryComponent)
  },
  {
    path: 'mediacenter/events',
    loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'help/sitemap',
    loadComponent: () => import('./site-map/site-map.component').then(m => m.SiteMapComponent)
  },
  {
    path: 'help/faq',
    loadComponent: () => import('./faq/faq.component').then(m => m.FaqComponent)
  }
]; 