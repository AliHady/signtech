import { Injectable } from '@angular/core';
import { ApiDataService } from '@signtech/shared/utils';
import { environment } from 'apps/signtech/src/environments/environment';
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