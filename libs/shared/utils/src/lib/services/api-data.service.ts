import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, tap } from 'rxjs';
import { TranslationService } from '@signtech/translations';
import { HttpMethod } from 'libs/core/http/enums/http-method.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService) { }

  /**
   * Generic method to fetch CMS data with pagination and language support
   * @param endpoint The CMS API endpoint to fetch data from
   * @param queryParams The query Params to fetch (optional)
   * @param cache Optional cache to store the response
   * @returns Observable of the paginated CMS response
   */
  getData<T>(
    endpoint: string,
    queryParams?: { [key: string]: any },
    cache?: BehaviorSubject<T | null>,
    appendLang: Boolean = false
  ): Observable<T> {
    return this.translationService.currentLang$.pipe(
      switchMap(currentLang => {
        // Clear cache when language changes
        if (cache) {
          cache.next(null);
        }

        let url = appendLang ? `${endpoint}/${currentLang}` : endpoint;
        const params: string[] = [];

        // Dynamically add query parameters
        if (queryParams) {
          for (const key in queryParams) {
            if (queryParams[key] !== undefined && queryParams[key] !== null) {
              params.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`);
            }
          }
        }

        if (params.length > 0) {
          url += `?${params.join('&')}`;
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

  downloadFile(endpoint: string): Observable<Blob> {
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

  submitForm(endpoint: string, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });
    return this.http.request(HttpMethod.POST, `${endpoint}`, {
      headers: headers,
      body: data
    });
  }

  submitFormData(endpoint: string, formData: FormData, token: any): Observable<any> {
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });
    return this.http.request(HttpMethod.POST, `${endpoint}`, {
      headers: headers,
      body: formData
    });
  }
} 