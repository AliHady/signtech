import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';

@Component({
  selector: 'app-data-request',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent
  ],
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DataRequestComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/data-request',
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
        name: 'FullName',
        type: 'text',
        label: { en: 'Full Name', ar: 'الاسم' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' }
          }
        }
      },
      {
        name: 'IdentityNumber',
        type: 'text',
        label: { en: 'Identity Number', ar: 'رقم الهوية' },
        required: true,
        maxLength: 10,
        validation: {
          required: true,
          pattern: '^\\d{10}$',
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            pattern: { en: 'Invalid ID number format', ar: 'رقم الهوية غير صحيح برجاء إدخال رقم هوية صحيح' }
          }
        }
      },
      {
        name: 'JobTitle',
        type: 'text',
        label: { en: 'Job Title', ar: 'المهنة/الوظيفية' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' }
          }
        }
      },
      {
        name: 'MobileNumber',
        type: 'text',
        label: { en: 'Mobile Number', ar: 'جوال' },
        required: true,
        maxLength: 10,
        validation: {
          required: true,
          pattern: '^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$',
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            pattern: { en: 'Invalid mobile number format', ar: 'رقم الجوال غير صحيح برجاء إدخال رقم جوال سعودي صحيح' }
          }
        }
      },
      {
        name: 'PhoneNumber',
        type: 'text',
        label: { en: 'Phone Number', ar: 'رقم الهاتف' },
        maxLength: 12,
        validation: {
          pattern: '^\\d+$',
          errorMessages: {
            pattern: { en: 'Invalid phone number format', ar: 'رقم الهاتف غير صحيح برجاء إدخال رقم هاتف سعودي صحيح' }
          }
        }
      },
      {
        name: 'Email',
        type: 'email',
        label: { en: 'Email', ar: 'البريد الإلكتروني' },
        required: true,
        maxLength: 250,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            email: { en: 'Invalid email format', ar: 'صيغة البريد الإلكتروني غير صحيحة' }
          }
        }
      },
      {
        name: 'OrganizationType',
        type: 'radio',
        label: { en: 'Organization Type', ar: 'نوع الجهة' },
        required: true,
        options: [
          { value: 0, label: { en: 'Government', ar: 'حكومية' } },
          { value: 1, label: { en: 'Private Sector', ar: 'قطاع خاص' } },
          { value: 2, label: { en: 'Research/Studies', ar: 'دراسات/أبحاث' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Please select organization type', ar: 'حقل مطلوب' }
          }
        }
      },
      {
        name: 'Organization',
        type: 'text',
        label: { en: 'Organization Name', ar: 'إسم الجهة' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' }
          }
        }
      },
      {
        name: 'PurposeForRequestingData',
        type: 'textarea',
        label: { en: 'Purpose of Data Request', ar: 'الغرض من طلب البيانات' },
        required: true,
        maxLength: 400,
        validation: {
          required: true,
          maxLength: 400,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            maxLength: { en: 'This field accepts only 400 characters', ar: 'هذا الحقل يقبل فقط 400 حرف' }
          }
        }
      },
      {
        name: 'DataType',
        type: 'textarea',
        label: { en: 'Data Type', ar: 'نوع البيانات' },
        required: true,
        maxLength: 400,
        validation: {
          required: true,
          maxLength: 400,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            maxLength: { en: 'This field accepts only 400 characters', ar: 'هذا الحقل يقبل فقط 400 حرف' }
          }
        }
      }
    ],
    submitButtonLabel: { en: 'Submit', ar: 'إرسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' }
  };

  constructor() { }
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