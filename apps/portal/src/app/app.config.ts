import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslationsModule } from '@nimic/translations';
import { CoreHttpModule } from '@nimic/core/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
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
          deps: [HttpClient]
        },
        defaultLanguage: 'ar',
        useDefaultLang: true
      })
    ),
    provideAnimations(),
  ],
};
 