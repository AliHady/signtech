import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { TranslationService } from '@nimic/translations';

@Injectable({
  providedIn: 'root'
})
export class CmsDataService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) { }

  /**
   * Generic method to fetch CMS data with pagination and language support
   * @param endpoint The CMS API endpoint to fetch data from
   * @param pageNumber The page number to fetch (optional)
   * @param pageSize The number of items per page (optional)
   * @param cache Optional cache to store the response
   * @returns Observable of the paginated CMS response
   */
  getCmsPaginatedData<T>(
    endpoint: string,
    pageNumber?: number,
    pageSize?: number,
    cache?: BehaviorSubject<T | null>
  ): Observable<T> {
    return this.translationService.currentLang$.pipe(
      switchMap(currentLang => {
        // Clear cache when language changes
        if (cache) {
          cache.next(null);
        }

        let url = `${endpoint}/${currentLang}`;
        const params: string[] = [];

        if (pageNumber !== undefined) {
          params.push(`pageNumber=${pageNumber}`);
        }
        if (pageSize !== undefined) {
          params.push(`pageSize=${pageSize}`);
        }

        if (params.length > 0) {
          url += `/?${params.join('&')}`;
        }

        return this.http.get<T>(url).pipe(
          tap(response => {
            if (cache) {
              cache.next(response);
            }
          })
        );
      })
    );
  }

  getPageContent<T>(
    endpoint: string,
    route: string,
    cache?: BehaviorSubject<T | null>
  ): Observable<T> {
    return this.translationService.currentLang$.pipe(
      switchMap(currentLang => {
        if (cache) {
          const cachedData = cache.value;
          if (cachedData) {
            return of(cachedData);
          }
        }

        let url = `${endpoint}`;
        const params: string[] = [];

        if (route !== undefined) {
          params.push(`route=${route}`);
        }

        params.push(`lang=${currentLang}`);


        if (params.length > 0) {
          url += `/?${params.join('&')}`;
        }

        return this.http.get<T>(url).pipe(
          tap(response => {
            if (cache) {
              cache.next(response);
            }
          })
        );
      })
    );
  }
} 