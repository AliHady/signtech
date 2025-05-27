import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpStatusUtil } from '../../utils/http-status.util';
import { Router } from '@angular/router';

@Injectable()
export class StatusCodeInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.handleSuccessResponse(event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(() => error);
      })
    );
  }

  private handleSuccessResponse(response: HttpResponse<any>): void {
    const status = response.status;
    if (HttpStatusUtil.isSuccess(status)) {
      // Handle successful responses (2xx)
      //console.log(`Request successful: ${status}`);
    } else if (HttpStatusUtil.isRedirect(status)) {
      // Handle redirect responses (3xx)
      //console.log(`Request redirected: ${status}`);
    }
  }

  private handleErrorResponse(error: HttpErrorResponse): void {
    const status = error.status;
    if (HttpStatusUtil.isClientError(status)) {
      // Handle client errors (4xx)
      console.error(`Client error: ${status}`, error);
    } else if (HttpStatusUtil.isServerError(status)) {
      // Handle server errors (5xx)
      console.error(`Server error: ${status}`, error);
      this.router.navigate(['/ar/server-down']);
    }
  }
} 