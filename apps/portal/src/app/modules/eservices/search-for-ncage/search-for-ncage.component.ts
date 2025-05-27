import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';
import { environment } from 'apps/Portal/src/environments/environment';

@Component({
  selector: 'app-search-for-ncage',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,

  ],
  templateUrl: './search-for-ncage.component.html',
  styleUrls: ['./search-for-ncage.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SearchForNcageComponent {
  formConfig: DynamicFormConfig = {
    endpoint: `${environment.contentUrl}/search-for-ncage`,
    method: 'POST',
    successMessage: {
      en: 'Your application has been submitted successfully',
      ar: 'تم تقديم طلبك بنجاح'
    },
    errorMessage: {
      en: 'Failed to submit application. Please try again',
      ar: 'فشل في تقديم الطلب. يرجى المحاولة مرة أخرى'
    },
    fields: [
      {
        name: 'crNumber',
        type: 'text',
        label: { en: 'Commercial Registration Number', ar: 'رقم السجل التجاري' },
        required: true,
        maxLength: 50,
        placeholder: { en: 'Enter commercial registration number', ar: 'أدخل رقم السجل التجاري' },
        validation: {
          required: true,
          maxLength: 50,
          errorMessages: {
            required: { en: 'Commercial registration number is required', ar: 'رقم السجل التجاري مطلوب' },
            maxLength: { en: 'Commercial registration number cannot exceed 50 characters', ar: 'لا يمكن أن يتجاوز رقم السجل التجاري 50 حرف' }
          }
        }
      }

    ],
    submitButtonLabel: { en: 'Submit', ar: 'إرسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' }
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor() { }

  onFormSubmitted(response: any) {
    if (this.formConfig.successMessage) {
      this.successMessage = this.formConfig.successMessage.en;
    }
    this.errorMessage = '';
    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    if (this.formConfig.errorMessage) {
      this.errorMessage = this.formConfig.errorMessage.en;
    }
    this.successMessage = '';
    console.error('Form submission failed:', error);
  }
}