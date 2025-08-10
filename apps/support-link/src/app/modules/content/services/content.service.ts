import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiDataService } from '@support-link/shared/utils';
import { Content } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly apiEndpoints = {
    content: `${environment.apiUrl}/cms/content`
  };

  constructor(private apiDataService: ApiDataService) { }

  getContent(route: string, lang: string): Observable<Content> {
    return this.apiDataService.getData<Content>(this.apiEndpoints.content, { route: route, lang: lang }, undefined, false);
  }
} 