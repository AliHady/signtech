import { ApiDataService } from '@signtech/shared/utils';
import { FooterModel } from '../models/footer.model';
import { Injectable } from '@angular/core';
import { environment } from 'apps/signtech/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private footerApiUrl = `${environment.apiUrl}/cms/footer`;
  private footerCache = new BehaviorSubject<FooterModel[] | null>(null);

  constructor(private apiDataService: ApiDataService,) { }

  getFooter(): Observable<FooterModel[]> {
    return this.apiDataService.getData<FooterModel[]>(
      this.footerApiUrl,
      undefined,
      this.footerCache,
      false
    );
  }
}