import { Injectable } from '@angular/core';
import { ApiDataService } from '@support-link/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiDataService: ApiDataService) { }
}