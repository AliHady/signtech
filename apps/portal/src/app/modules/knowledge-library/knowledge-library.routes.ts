import { Route } from '@angular/router';

export const knowledgeLibraryRoutes: Route[] = [
  {
    path: 'knowledge-library',
   loadComponent: () => import('./knowledge-library-home/knowledge-library-home.component').then(m => m.KnowledgeLibraryHomeComponent)
  },
  {
    path: 'knowledge-library/consulting-studies/new',
    loadComponent: () => import('./consulting-studies-new/consulting-studies-new.component').then(m => m.ConsultingStudiesNewComponent)
  },
  {
    path: 'knowledge-library/consulting-studies',
    loadComponent: () => import('./consulting-studies-list/consulting-studies-list.component').then(m => m.ConsultingStudiesListComponent)
  }

]; 