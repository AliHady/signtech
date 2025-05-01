import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { NewsResponse } from '../models/news.model';
import { environment } from '../../../../environments/environment';
import { TranslationService } from '@nimic/translations';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.contentUrl}/news`;
  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);
  private currentLang: string | null = null;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {
    // Subscribe to language changes to clear cache when language changes
    this.translationService.currentLang$.subscribe(lang => {
      if (this.currentLang !== lang) {
        this.currentLang = lang;
        this.latestNewsCache.next(null); // Clear cache on language change
      }
    });
  }

  getLatestNews(): Observable<NewsResponse> {
    return this.translationService.currentLang$.pipe(
      switchMap(currentLang => {
        const cachedData = this.latestNewsCache.value;
        if (cachedData) {
          return of(cachedData);
        }
        
        const url = `${this.apiUrl}/${currentLang}/?pageNumber=1&pageSize=3`;
        return this.http.get<NewsResponse>(url).pipe(
          tap(response => {
            this.latestNewsCache.next(response);
          })
        );
      })
    );
  }
} 