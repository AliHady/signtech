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
  ) {}

  /**
   * Generic method to fetch CMS data with pagination and language support
   * @param endpoint The CMS API endpoint to fetch data from
   * @param pageNumber The page number to fetch
   * @param pageSize The number of items per page
   * @param cache Optional cache to store the response
   * @returns Observable of the paginated CMS response
   */
  getCmsPaginatedData<T>(
    endpoint: string,
    pageNumber = 1,
    pageSize = 10,
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
        
        const url = `${endpoint}/${currentLang}/?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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