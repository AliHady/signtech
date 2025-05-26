import { Route } from '@angular/router';

export const knowledgeLibraryRoutes: Route[] = [
  {
    path: 'knowledge-library',
   loadComponent: () => import('./knowledge-library-home/knowledge-library-home.component').then(m => m.KnowledgeLibraryHomeComponent)
  },
  {
    path: 'knowledge-library/consulting-studies',
    loadComponent: () => import('./consulting-studies/consulting-studies.component').then(m => m.ConsultingStudiesComponent)
  }
]; 