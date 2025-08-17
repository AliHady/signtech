import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDataService } from '@signtech/shared/utils';
import { LookupItem } from '../models/lookup-item.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private apiDataService: ApiDataService) { }

  getLookup(baseURL: string, name: string, parentId?: number): Observable<LookupItem[]> {
    const params = parentId ? { parentId } : undefined;
    return this.apiDataService.getData<LookupItem[]>(`${baseURL}/lookup/${name}`,
      params, undefined, false);
  }
}