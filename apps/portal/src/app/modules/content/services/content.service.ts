import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { NewsResponse } from '../models/news.model';
import { VideoResponse } from '../models/video.model';
import { EventsResponse } from '../models/events.model';
import { ImageGalleryResponse } from '../models/images.model';
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

  constructor(private cmsDataService: CmsDataService) { }

  private getPaginatedData<T>(endpoint: keyof typeof this.apiEndpoints, pageNumber = 1, pageSize = 9, showInHome?: boolean): Observable<T> {
    return this.cmsDataService.getCmsData<T>(this.apiEndpoints[endpoint],
      showInHome ? { pageNumber: pageNumber, pageSize: pageSize, showInHome: showInHome } :
        { pageNumber: pageNumber, pageSize: pageSize });
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

  getAllEservices(pageNumber = 1, pageSize = 9, showInHome?: boolean): Observable<EServiceLinksResponse> {
    return this.getPaginatedData<EServiceLinksResponse>('eservices', pageNumber, pageSize, showInHome);
  }

  getContent(route: string): Observable<Content> {
    return this.cmsDataService.getCmsData<Content>(this.apiUrlContent, { route: route });
  }
} 