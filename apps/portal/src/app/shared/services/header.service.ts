import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationMenuResponse } from '../models/navmen.model';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = `${environment.contentUrl}/navmenu`;
  private menuCache = new BehaviorSubject<NavigationMenuResponse | null>(null);

  constructor(private cmsDataService: CmsDataService) {}

  getNavigationMenu(): Observable<NavigationMenuResponse> {
    return this.cmsDataService.getCmsPaginatedData<NavigationMenuResponse>(
      this.apiUrl,
      undefined,
      undefined,
      this.menuCache
    );
  }
} 