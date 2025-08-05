import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiDataService } from '@support-link/shared/utils';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly apiEndpoints = {
    content: `${environment.apiUrl}/cms/content`
  };

  constructor(
    private apiDataService: ApiDataService,
    private http: HttpClient) { }

  private getPaginatedData<T>(endpoint: keyof typeof this.apiEndpoints, pageNumber = 1, pageSize = 9, showInHome?: boolean): Observable<T> {
    return this.apiDataService.getData<T>(this.apiEndpoints[endpoint],
      showInHome ? { pageNumber: pageNumber, pageSize: pageSize, showInHome: showInHome } :
        { pageNumber: pageNumber, pageSize: pageSize });
  }

  getContent(route: string, lang: string): Observable<Content> {
    return this.apiDataService.getData<Content>(this.apiEndpoints.content, { route: route, lang: lang }, undefined, false);
  }
} 