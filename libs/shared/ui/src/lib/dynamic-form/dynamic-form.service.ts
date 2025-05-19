import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DynamicFormConfig } from './dynamic-form.interface';
import { environment } from 'apps/Portal/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  constructor(private http: HttpClient) {}

  submitForm(config: DynamicFormConfig, formData: any): Observable<any> { 
    console.log(config, formData);
    return this.http.request(config.method, `${environment.portalUrl}${config.endpoint}`, {
      body: formData
    });
  }
}