import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsResponse } from '../../content/models/news.model';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.contentUrl}/news`;
  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) {}

  getLatestNews(): Observable<NewsResponse> {
    return this.cmsDataService.getCmsPaginatedData<NewsResponse>(
      this.apiUrl,
      1,
      3,
      this.latestNewsCache
    );
  }
} 