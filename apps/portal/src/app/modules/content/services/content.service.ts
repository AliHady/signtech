import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { NewsResponse } from '../../home/models/news.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrlNews = `${environment.contentUrl}/news`;
  private apiUrlEvents = `${environment.contentUrl}/events`;
  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) {}

  getAllNews(pageNumber = 1, pageSize = 9): Observable<NewsResponse> {
    return this.cmsDataService.getCmsPaginatedData<NewsResponse>(
      this.apiUrlNews,
      pageNumber,
      pageSize
    );
  }
  getAllEvents(pageNumber = 1, pageSize = 9): Observable<NewsResponse> {
    return this.cmsDataService.getCmsPaginatedData<NewsResponse>(
      this.apiUrlEvents,
      pageNumber,
      pageSize
    );
  }
} 