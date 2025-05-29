import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CmsDataService } from '@nimic/shared/utils';
import { ConsultingStudiesResponse, ConsultingStudyResponse } from '../models/consulting-studies.model';
import { ConsultingStudiesLookups } from '../models/consulting-studies-lookups.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultingStudiesService {
  private readonly apiEndpoints = {
    consultingStudies: `${environment.consultingStudiesUrl}/consulting-studies`
  };

  constructor(private cmsDataService: CmsDataService) { }

  getAllConsultingStudies(pageNumber = 1, pageSize = 10): Observable<ConsultingStudiesResponse> {
    return this.cmsDataService.getCmsData<ConsultingStudiesResponse>(this.apiEndpoints['consultingStudies'],
      { pageNumber: pageNumber, pageSize: pageSize }, undefined, false);
  }

  getConsultingStudy(id: number): Observable<ConsultingStudyResponse> {
    return this.cmsDataService.getCmsData<ConsultingStudyResponse>(`${this.apiEndpoints['consultingStudies']}/${id}`,
      undefined, undefined, false);
  }

  downloadConsultingStudy(id: number): Observable<Blob> {
    return this.cmsDataService.downloadFile(`${this.apiEndpoints['consultingStudies']}/download/${id}`);
  }

  getConsultingStudiesLookups(): Observable<ConsultingStudiesLookups> {
    return this.cmsDataService.getCmsData<ConsultingStudiesLookups>(`${this.apiEndpoints['consultingStudies']}/lookups`,
      undefined, undefined, false);
  }
}