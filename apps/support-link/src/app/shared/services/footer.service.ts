import { CmsDataService } from '@support-link/shared/utils';
import { FooterModel } from '../models/footer.model';
import { Injectable } from '@angular/core';
import { environment } from 'apps/support-link/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerApiUrl = `${environment.contentUrl}/cms/footer`;
  private footerCache = new BehaviorSubject<FooterModel[] | null>(null);

  constructor(private cmsDataService: CmsDataService) { }

  getFooter(): Observable<FooterModel[]> {
    return this.cmsDataService.getCmsData<FooterModel[]>(
      this.footerApiUrl,
      undefined,
      this.footerCache,
      false
    );
  }
}