import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmsDataService } from '@support-link/shared/utils';
import { environment } from '../../../environments/environment';
import { Footer } from '../models/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerApiUrl = `${environment.contentUrl}/cms/footer`;
  private footerCache = new BehaviorSubject<Footer | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getFooter(): Observable<Footer> {
    return this.cmsDataService.getCmsData<Footer>(
      this.footerApiUrl,
      undefined,
      this.footerCache,
      false
    );
  }
} 