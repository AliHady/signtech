import { Injectable } from '@angular/core';
import { ApiDataService } from '@support-link/shared/utils';
import { RequestsResponse } from '../models/requests.model';
import { environment } from 'apps/support-link/src/environments/environment';
import { Observable } from 'rxjs';
import { RequestDetails } from '../models/request-details.model';
import { AddCommentDto } from '../models/add-comment.model';
import { CommentResponse } from '../models/comment.model';
import { DashboardStatisticsDto } from '../models/dashboard-statistics.model';
import { PeriodStatisticsDto } from '../models/period-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly apiEndpoints = {
    request: `${environment.apiUrl}/request`
  };

  constructor(private apiDataService: ApiDataService) { }

  getMyRequests(pageIndex = 1, pageSize = 10, searchQuery?: string): Observable<RequestsResponse> {
    return this.apiDataService.getData<RequestsResponse>(`${this.apiEndpoints.request}/my-requests`,
      searchQuery ? { ppageIndex: pageIndex, pageSize: pageSize, searchQuery: searchQuery } :
        { pageIndex: pageIndex, pageSize: pageSize }, undefined, false);
  }

  getAllRequests(pageIndex = 1, pageSize = 10, searchQuery?: string): Observable<RequestsResponse> {
    return this.apiDataService.getData<RequestsResponse>(`${this.apiEndpoints.request}`,
      searchQuery ? { ppageIndex: pageIndex, pageSize: pageSize, searchQuery: searchQuery } :
        { pageIndex: pageIndex, pageSize: pageSize }, undefined, false);
  }

  getRequestDetails(id: string): Observable<RequestDetails> {
    return this.apiDataService.getData<RequestDetails>(`${this.apiEndpoints.request}/${id}`,
      undefined, undefined, false);
  }

  getDashboardStatistics(): Observable<DashboardStatisticsDto> {
    return this.apiDataService.getData<DashboardStatisticsDto>(`${this.apiEndpoints.request}/statistics`, undefined
      , undefined, false);
  }

  getPeriodStatistics(): Observable<PeriodStatisticsDto> {
    return this.apiDataService.getData<PeriodStatisticsDto>(`${this.apiEndpoints.request}/period-statistics`, undefined
      , undefined, false);
  }

  addComment(dto: AddCommentDto, token: any): Observable<any> {
    return this.apiDataService.submitForm(
      `${this.apiEndpoints.request}/comment`,
      dto,
      token
    );
  }

  getComments(requestId: string, pageIndex = 1, pageSize = 10): Observable<CommentResponse> {
    return this.apiDataService.getData<CommentResponse>(`${this.apiEndpoints.request}/${requestId}/comments`, {
      pageIndex,
      pageSize,
      _: Date.now()
    }, undefined, false);
  }
}