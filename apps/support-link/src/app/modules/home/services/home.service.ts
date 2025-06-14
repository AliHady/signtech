import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SliderItemDto } from '../models/slider.model';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@support-link/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private sliderApiUrl = `${environment.contentUrl}/cms/slider`;
  private sliderCache = new BehaviorSubject<SliderItemDto[] | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getSliders(): Observable<SliderItemDto[]> {
    return this.cmsDataService.getCmsData<SliderItemDto[]>(
      this.sliderApiUrl,
      undefined,
      this.sliderCache,
      false
    );
  }
} 