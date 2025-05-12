import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from '@nimic/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class EServicesService {
  private readonly apiEndpoints = {
    contactUs: `${environment.contentUrl}/contact-us`,
    applyToTarmeez: `${environment.contentUrl}/apply-to-tarmeez`,
  };

  constructor(private baseService: BaseService) { }

  submitContactUs(formData: any) {
    return this.baseService.submit(this.apiEndpoints.contactUs, formData);
  }

  submitApplyToTarmeez(formData: any) {
    return this.baseService.submit(this.apiEndpoints.applyToTarmeez, formData);
  }
} 