import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Header } from '../models/header.model';
import { ApiDataService } from '@support-link/shared/utils';
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
  private apiUrl = `${environment.contentUrl}/cms/header`;
  private menuCache = new BehaviorSubject<Header | null>(null);
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);

  constructor(private apiDataService: ApiDataService,) { }

  getHeader(): Observable<Header> {
    return this.apiDataService.getData<Header>(
      this.apiUrl,
      undefined,
      this.menuCache,
      false
    ).pipe(
      tap(response => {
        const menuItems = response.map(item => ({
          id: item.Id,
          title: item.Title,
          url: item.Url,
          children: item.SubMenus?.map(child => ({
            id: child.Id,
            title: child.Title,
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