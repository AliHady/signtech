import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes, getBaseHref } from './app.routes.server';

const baseHref = getBaseHref();

// Set the base href in the environment for server-side rendering
process.env['BASE_HREF'] = baseHref;

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: 'BASE_HREF',
      useValue: baseHref
    },
    {
      provide: 'ASSET_BASE_HREF',
      useValue: baseHref.endsWith('/') ? baseHref : `${baseHref}/`
    }
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
