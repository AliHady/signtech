import { Injectable } from '@angular/core';
import { ApiDataService } from '@support-link/shared/utils';
import { RequestsResponse } from '../models/requests.model';
import { environment } from 'apps/support-link/src/environments/environment';
import { Observable } from 'rxjs';
import { RequestDetails } from '../models/request-details.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiEndpoints = {
    request: `${environment.apiUrl}/request`
  };

  constructor(private apiDataService: ApiDataService) { }

  getMyRequests(pageIndex = 1, pageSize = 10, searchQuery?: string): Observable<RequestsResponse> {
    return this.apiDataService.getData<RequestsResponse>(`${this.apiEndpoints.request}/my-requests`,
      searchQuery ? { ppageIndex: pageIndex, pageSize: pageSize, searchQuery: searchQuery } :
        { pageIndex: pageIndex, pageSize: pageSize }, undefined, false);
  }

  getRequestDetails(id: string): Observable<RequestDetails> {
    return this.apiDataService.getData<RequestDetails>(`${this.apiEndpoints.request}/${id}`,
      undefined, undefined, false);
  }
}