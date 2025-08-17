import { Route } from '@angular/router';

export const contentRoutes: Route[] = [
    {
        path: 'about-us',
        loadComponent: () => import('./cms-data/cms-data.component').then(m => m.CMSDataComponent)
    },
]; 