import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../services/e-services.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';

@Component({
  selector: 'app-request-code',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent
  ],
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RequestCodeComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/CMS/api/request-code',
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
        name: 'contactType',
        type: 'radio',
        label: { en: 'Contact Type', ar: 'نوع الاتصال' },
        required: true,
        options: [
          { value: 1, label: { en: 'Suggestion', ar: 'اقتراح' } },
          { value: 2, label: { en: 'Complaint', ar: 'شكوى' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Please select a contact type', ar: 'يرجى اختيار نوع الاتصال' }
          }
        }
      },
      
    ],
    submitButtonLabel: { en: 'Submit', ar: 'إرسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' } 
  };

  constructor(private eServicesService: EServicesService) {}
  successMessage: string = '';
  errorMessage: string = '';
  
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