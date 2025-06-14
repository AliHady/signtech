import { ApplicationConfig, inject, PLATFORM_ID, Inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslationsModule } from '@support-link/translations';
import { CoreHttpModule } from '@support-link/core/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient, platformId: Object) {
  let baseHref = '/';
  if (isPlatformBrowser(platformId)) {
    baseHref = document.querySelector('base')?.href || '/';
  } else {
    // For server-side rendering, use the environment variable or default
    baseHref = process.env['BASE_HREF'] || '/';
  }
  return new TranslateHttpLoader(http, `${baseHref}assets/i18n/`, '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideRouter(appRoutes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          // Only modify requests to specific domains that need SSL handling
          if (req.url.includes('your-api-domain.com')) {
            const modifiedReq = req.clone({
              setParams: {
                rejectUnauthorized: 'false'
              }
            });
            return next(modifiedReq);
          }
          return next(req);
        }
      ])
    ),
    importProvidersFrom(
      CoreHttpModule,
      LoadingBarModule,
      LoadingBarRouterModule,
      LoadingBarHttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient, PLATFORM_ID]
        },
        defaultLanguage: 'ar',
        useDefaultLang: true
      })
    ),
    provideAnimations(),
    provideRouter([]),
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey
    }
  ],
};
