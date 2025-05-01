import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, retryWhen } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private readonly MAX_RETRIES = 3;
  private readonly BASE_DELAY = 1000; // 1 second

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error: HttpErrorResponse, retryCount) => {
            // Don't retry for client errors (4xx) except 429 (Too Many Requests)
            if (
              error.status >= 400 &&
              error.status < 500 &&
              error.status !== 429
            ) {
              return throwError(() => error);
            }

            if (retryCount >= this.MAX_RETRIES) {
              return throwError(() => error);
            }

            // Exponential backoff: 1s, 2s, 4s, etc.
            const delay = this.BASE_DELAY * Math.pow(2, retryCount);
            return timer(delay);
          })
        )
      )
    );
  }
} 