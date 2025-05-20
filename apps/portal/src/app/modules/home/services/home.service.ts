import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsResponse } from '../../content/models/news.model';
import { BannerItemDto } from '../models/banner.model';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private newsApiUrl = `${environment.contentUrl}/news`;
  private bannerApiUrl = `${environment.contentUrl}/banners`;
  private latestNewsCache = new BehaviorSubject<NewsResponse | null>(null);
  private bannerCache = new BehaviorSubject<BannerItemDto[] | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getLatestNews(): Observable<NewsResponse> {
    return this.cmsDataService.getCmsData<NewsResponse>(
      this.newsApiUrl,
      { pageNumber: 1, pageSize: 3 },
      this.latestNewsCache
    );
  }

  getBanners(): Observable<BannerItemDto[]> {
    return this.cmsDataService.getCmsData<BannerItemDto[]>(
      this.bannerApiUrl,
      undefined,
      this.bannerCache
    );
  }
} 