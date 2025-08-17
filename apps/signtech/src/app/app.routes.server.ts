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
    path: ':lang/services/:id',
    renderMode: RenderMode.Server
  },
  {
    path: ':lang/dashboard/requests/:id',
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

// Helper function to get the base href from environment or default to '/'
export function getBaseHref(): string {
  return process.env['BASE_HREF'] || '/';
}
