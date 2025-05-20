import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavMenu } from '../models/navmen.model';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = `${environment.contentUrl}/navmenu`;
  private menuCache = new BehaviorSubject<NavMenu | null>(null);
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor(private cmsDataService: CmsDataService) {}

  getNavigationMenu(): Observable<NavMenu> {
    return this.cmsDataService.getCmsData<NavMenu>(
      this.apiUrl,
      undefined,
      this.menuCache
    ).pipe(
      tap(response => {
        const menuItems = response.map(item => ({
          id: item.Id,
          title: item.Text,
          url: item.Url,
          children: item.Items?.map(child => ({
            id: child.Id,
            title: child.Text,
            url: child.Url
          }))
        }));
        this.menuItemsSubject.next(menuItems);
      })
    );
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItemsSubject.asObservable();
  }
} 