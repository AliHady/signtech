import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SliderItemDto } from '../models/slider.model';
import { environment } from '../../../../environments/environment';
import { ApiDataService } from '@support-link/shared/utils';
import { ReviewsResponse } from '../models/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private sliderApiUrl = `${environment.apiUrl}/cms/slider`;
  private sliderCache = new BehaviorSubject<SliderItemDto[] | null>(null);
  private reviewsApiUrl = `${environment.apiUrl}/customer/reviews`;
  private reviewsCache = new BehaviorSubject<ReviewsResponse[] | null>(null);

  constructor(private apiDataService: ApiDataService,) { }

  getSliders(): Observable<SliderItemDto[]> {
    return this.apiDataService.getData<SliderItemDto[]>(
      this.sliderApiUrl,
      undefined,
      this.sliderCache,
      false
    );
  }

  getReviews(): Observable<ReviewsResponse[]> {
    return this.apiDataService.getData<ReviewsResponse[]>(
      this.reviewsApiUrl,
      undefined,
      this.reviewsCache,
      false
    );
  }
} 