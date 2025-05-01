import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

  
      console.log(
        '%c AppHttpInterceptor Called',
        'background:#007ACC;color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold;',
        '⇢', req.method, req.url
      );
    

    /* ---------- 2. Add headers only when needed ---------- */
    let headers = req.headers;

    // Don’t set Content-Type for GET/HEAD or when it’s already provided
    if (req.body && !headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }

    // Accept is safe to add, but skip if caller overrode it
    if (!headers.has('Accept')) {
      headers = headers.set('Accept', 'application/json');
    }

    const cloned = req.clone({ headers });

    /* ---------- 3. Pass through, tap responses ---------- */
    return next.handle(cloned).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // central place for success handling if you ever need it
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // map server errors → domain errors here if you like
        console.error('[HTTP]', error);
        return throwError(() => error);
      })
    );
  }
}
