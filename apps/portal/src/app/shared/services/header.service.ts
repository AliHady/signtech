import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavMenu } from '../models/navmen.model';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = `${environment.contentUrl}/navmenu`;
  private menuCache = new BehaviorSubject<NavMenu | null>(null);

  constructor(private cmsDataService: CmsDataService) {}

  getNavigationMenu(): Observable<NavMenu> {
   // console.log("getNavigationMenu");
    return this.cmsDataService.getCmsPaginatedData<NavMenu>(
      this.apiUrl,
      undefined,
      undefined,
      this.menuCache
    );
  }
} 