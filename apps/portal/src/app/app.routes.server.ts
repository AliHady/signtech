import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { lang: 'ar' },
        { lang: 'en' }
      ];
    }
  },
  {
    path: ':lang/mediacenter/news/:id',
    renderMode: RenderMode.Server
  },
  {
    path: ':lang/mediacenter/events/:id',
    renderMode: RenderMode.Server
  },
  {
    path: ':lang/eservices/:id',
    renderMode: RenderMode.Server
  },
  {
    path: ':lang/**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { lang: 'ar', '**': 'index' },
        { lang: 'en', '**': 'index' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { '**': '404' }
      ];
    }
  }
];
