import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DynamicFormConfig } from './dynamic-form.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  constructor(private http: HttpClient) { }

  submitForm(config: DynamicFormConfig, formData: any, token: any): Observable<any> {
    console.log(config, formData);
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });

    return this.http.request(config.method, `${config.endpoint}`, {
      headers: headers,
      body: formData
    });
  }

  submitFormData(config: DynamicFormConfig, formData: FormData, token: any): Observable<any> {
    console.log(config, formData);
    const headers = new HttpHeaders({ 'X-Recaptcha-Token': token });

    return this.http.request(config.method, `${config.endpoint}`, {
      headers: headers,
      body: formData
    });
  }
}