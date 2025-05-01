import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthInterceptor,
  CacheInterceptor,
  ErrorInterceptor,
  LoadingInterceptor,
  LoggingInterceptor,
  RetryInterceptor,
  StatusCodeInterceptor,
  TimeoutInterceptor
} from './interceptors';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoadingService } from './services/loading.service';
import { ErrorHandlingService } from './services/error-handling.service';

@NgModule({
  providers: [
    AuthService,
    TokenService,
    LoadingService,
    ErrorHandlingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StatusCodeInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeoutInterceptor,
      multi: true
    }
  ]
})
export class CoreHttpModule {} 