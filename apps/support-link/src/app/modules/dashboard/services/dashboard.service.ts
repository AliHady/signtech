import { Injectable } from '@angular/core';
import { ApiDataService } from '@support-link/shared/utils';
import { environment } from 'apps/support-link/src/environments/environment';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiEndpoints = {
    customer: `${environment.apiUrl}/customer`
  };

  constructor(private apiDataService: ApiDataService) { }

  getUserProfile(): Observable<ProfileResponse> {
    return this.apiDataService.getData<ProfileResponse>(`${this.apiEndpoints.customer}/profile`, undefined
      , undefined, false);
  }
}