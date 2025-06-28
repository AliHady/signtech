import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SliderItemDto } from '../models/slider.model';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@support-link/shared/utils';
import { ServiceItemDto } from '../models/our-services.model';
import { ReviewsResponse } from '../models/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private sliderApiUrl = `${environment.contentUrl}/cms/slider`;
  private sliderCache = new BehaviorSubject<SliderItemDto[] | null>(null);
  private servicesApiUrl = `${environment.contentUrl}/cms/our-services`;
  private servicesCache = new BehaviorSubject<ServiceItemDto[] | null>(null);
  private reviewsApiUrl = `${environment.contentUrl}/customer/reviews`;
  private reviewsCache = new BehaviorSubject<ReviewsResponse[] | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getSliders(): Observable<SliderItemDto[]> {
    return this.cmsDataService.getCmsData<SliderItemDto[]>(
      this.sliderApiUrl,
      undefined,
      this.sliderCache,
      false
    );
  }

  getOurServices(): Observable<ServiceItemDto[]> {
    return this.cmsDataService.getCmsData<ServiceItemDto[]>(
      this.servicesApiUrl,
      undefined,
      this.servicesCache,
      false
    );
  }

   getReviews(): Observable<ReviewsResponse[]> {
    return this.cmsDataService.getCmsData<ReviewsResponse[]>(
      this.reviewsApiUrl,
      undefined,
      this.reviewsCache,
      false
    );
  }
} 