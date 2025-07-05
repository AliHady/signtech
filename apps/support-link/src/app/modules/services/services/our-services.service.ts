import { Injectable } from '@angular/core';
import { ApiDataService } from '@support-link/shared/utils';
import { Observable } from 'rxjs';
import { ServiceItemDto, ServicesResponse } from '../../home/models/our-services.model';
import { environment } from 'apps/support-link/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OurServicesService {
  private servicesApiUrl = `${environment.contentUrl}/cms/our-services`;

  constructor(private apiDataService: ApiDataService) { }

  getOurServices(pageNumber = 1, pageSize = 6): Observable<ServicesResponse> {
    return this.apiDataService.getData<ServicesResponse>(this.servicesApiUrl, { pageNumber: pageNumber, pageSize: pageSize });
  }

  getServiceDetails(serviceId: number): Observable<ServiceItemDto> {
    return this.apiDataService.getData<ServiceItemDto>(`${this.servicesApiUrl}/${serviceId}`);
  }
} 