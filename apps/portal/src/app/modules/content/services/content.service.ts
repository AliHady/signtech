import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { NewsResponse } from '../../home/models/news.model';
import { Content } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = `${environment.contentUrl}/news`;
  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getAllNews(pageNumber = 1, pageSize = 9): Observable<NewsResponse> {
    return this.cmsDataService.getCmsPaginatedData<NewsResponse>(
      this.apiUrl,
      pageNumber,
      pageSize
    );
  }

  getContent(route: string): Observable<Content> {
    let apiUrl = `${environment.contentUrl}/content`;
    return this.cmsDataService.getPageContent<Content>(
      apiUrl,
      route
    );
  }
} 