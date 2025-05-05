import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../environments/environment';
import { Partners } from '../models/partners.model';
import { ImportantLinks } from '../models/importantlinks.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private partnersApiUrl = `${environment.contentUrl}/partners`;
  private importantLinksApiUrl = `${environment.contentUrl}/importantlinks`;
  private partnersCache = new BehaviorSubject<Partners | null>(null);
  private importantLinksCache = new BehaviorSubject<ImportantLinks | null>(null);

  constructor(private cmsDataService: CmsDataService) {}  

  getPartners(): Observable<Partners> {
    return this.cmsDataService.getCmsPaginatedData<Partners>(
      this.partnersApiUrl,
      undefined,
      undefined,
      this.partnersCache
    );
  }

  getImportantLinks(): Observable<ImportantLinks> {
    return this.cmsDataService.getCmsPaginatedData<ImportantLinks>(
      this.importantLinksApiUrl,
      undefined,
      undefined,
      this.importantLinksCache
    );
  }
} 