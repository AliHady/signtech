import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { NewsResponse } from '../models/news.model';
import { environment } from '../../../../environments/environment';
import { TranslationService } from '@nimic/translations';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.contentUrl}/news`;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  getLatestNews(): Observable<NewsResponse> {
    return this.translationService.currentLang$.pipe(
      switchMap(currentLang => {
        const url = `${this.apiUrl}/${currentLang}/?pageNumber=1&pageSize=3`;
        return this.http.get<NewsResponse>(url);
      })
    );
  }
} 