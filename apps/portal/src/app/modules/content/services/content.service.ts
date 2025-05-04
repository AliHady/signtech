import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { NewsResponse } from '../../home/models/news.model';
import { VideoResponse } from '../../home/models/video.model';
import { EventsResponse } from '../../home/models/events.model';
import { ImageGalleryResponse } from '../../home/models/images.model';
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrlNews = `${environment.contentUrl}/news`;
  private apiUrlEvents = `${environment.contentUrl}/events`;
  private apiUrlVideos = `${environment.contentUrl}/videolibrary`;
  private apiUrlPhotos = `${environment.contentUrl}/photolibrary`;

  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getAllNews(pageNumber = 1, pageSize = 9): Observable<NewsResponse> {
    return this.cmsDataService.getCmsPaginatedData<NewsResponse>(
      this.apiUrlNews,
      pageNumber,
      pageSize
    );
  }
  getAllEvents(pageNumber = 1, pageSize = 9): Observable<EventsResponse> {
    return this.cmsDataService.getCmsPaginatedData<EventsResponse>(
      this.apiUrlEvents,
      pageNumber,
      pageSize
    );
  }
  getAllVideos(pageNumber = 1, pageSize = 9): Observable<VideoResponse> {
    return this.cmsDataService.getCmsPaginatedData<VideoResponse>(
      this.apiUrlVideos,
      pageNumber,
      pageSize
    );
  }
  getAllImages(pageNumber = 1, pageSize = 9): Observable<ImageGalleryResponse> {
    return this.cmsDataService.getCmsPaginatedData<ImageGalleryResponse>(
      this.apiUrlPhotos,
      pageNumber,
      pageSize
    );
  }
} 