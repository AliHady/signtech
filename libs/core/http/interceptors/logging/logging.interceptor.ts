import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(7);

  /*   console.log(`[${requestId}] Request: ${request.method} ${request.url}`, {
      headers: request.headers,
      body: request.body
    }); */

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            const elapsedTime = Date.now() - startTime;
         /*    console.log(
              `[${requestId}] Response: ${request.method} ${request.url}`,
              {
                status: event.status,
                elapsedTime: `${elapsedTime}ms`,
                body: event.body
              }
            ); */
          }
        },
        (error) => {
          const elapsedTime = Date.now() - startTime;
         /*  console.error(
            `[${requestId}] Error: ${request.method} ${request.url}`,
            {
              error,
              elapsedTime: `${elapsedTime}ms`
            }
          ); */
        }
      )
    );
  }
} 