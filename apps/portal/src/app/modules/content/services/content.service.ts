import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { NewsResponse } from '../../home/models/news.model';
import { VideoResponse } from '../../home/models/video.model';
import { EventsResponse } from '../../home/models/events.model';
import { ImageGalleryResponse } from '../../home/models/images.model';
import { EServiceLinksResponse } from '../../eservices/models/eserviceslinks.model';
import { Content } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly apiEndpoints = {
    news: `${environment.contentUrl}/news`,
    events: `${environment.contentUrl}/events`,
    videos: `${environment.contentUrl}/videolibrary`,
    photos: `${environment.contentUrl}/photolibrary`,
    eservices: `${environment.contentUrl}/eserviceslinks`
  };
  private apiUrlContent = `${environment.contentUrl}/content`;

  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  private getPaginatedData<T>(
    endpoint: keyof typeof this.apiEndpoints,
    pageNumber = 1,
    pageSize = 9
  ): Observable<T> {
    return this.cmsDataService.getCmsPaginatedData<T>(
      this.apiEndpoints[endpoint],
      pageNumber,
      pageSize
    );
  }

  getAllNews(pageNumber = 1, pageSize = 9): Observable<NewsResponse> {
    return this.getPaginatedData<NewsResponse>('news', pageNumber, pageSize);
  }
  getAllEvents(pageNumber = 1, pageSize = 9): Observable<EventsResponse> {
    return this.getPaginatedData<EventsResponse>('events', pageNumber, pageSize);
  }
  

  getAllVideos(pageNumber = 1, pageSize = 9): Observable<VideoResponse> {
    return this.getPaginatedData<VideoResponse>('videos', pageNumber, pageSize);
  }


  getAllImages(pageNumber = 1, pageSize = 9): Observable<ImageGalleryResponse> {
    return this.getPaginatedData<ImageGalleryResponse>('photos', pageNumber, pageSize);
  }

  getAllEservices(pageNumber = 1, pageSize = 9): Observable<EServiceLinksResponse> {
    return this.getPaginatedData<EServiceLinksResponse>('eservices', pageNumber, pageSize);
  }

  getContent(route: string): Observable<Content> {
    return this.cmsDataService.getPageContent<Content>(
      this.apiUrlContent,
      route
    );
  }
} 