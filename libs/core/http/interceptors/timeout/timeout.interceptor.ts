import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const timeoutValue = this.getTimeoutValue(request);
    
    return next.handle(request).pipe(
      timeout(timeoutValue),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          console.error(`Request timed out after ${timeoutValue}ms:`, request.url);
          return throwError(() => new Error('Request timed out'));
        }
        return throwError(() => error);
      })
    );
  }

  private getTimeoutValue(request: HttpRequest<unknown>): number {
    // You can customize timeout based on request type or URL
    if (request.url.includes('/upload')) {
      return 60000; // 1 minute for uploads
    }
    return this.DEFAULT_TIMEOUT;
  }
} 