import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';

@Component({
  selector: 'app-employment',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent
  ],
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EmploymentComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/employment',
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
        placeholder: { en: 'Full Name', ar: 'الاسم' },
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
        placeholder: { en: 'Identity Number', ar: 'رقم الهوية' },
        validation: {
          required: true,
          pattern: '^\\d{10}$',
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            pattern: { en: 'Invalid identity number format', ar: 'رقم الهوية غير صحيح برجاء إدخال رقم هوية صحيح' }
          }
        }
      },
      {
        name: 'MobileNumber',
        type: 'phone',
        label: { en: 'Mobile Number', ar: 'جوال' },
        required: true,
        maxLength: 10,
        placeholder: { en: 'Mobile Number', ar: 'جوال' },
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
        name: 'Email',
        type: 'email',
        label: { en: 'Email', ar: 'البريد الإلكتروني' },
        required: true,
        maxLength: 250,
        placeholder: { en: 'Email', ar: 'البريد الإلكتروني' },
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' },
            email: { en: 'Invalid email format', ar: 'صيغة البريد الإلكتروني غير صحيحة' }
          }
        }
      },
      {
        name: 'EmploymentType',
        type: 'select',
        label: { en: 'Employment Type', ar: 'الوظيفة المراد التقدم عليها' },
        required: true,
        placeholder: { en: 'Select employment type', ar: 'إختر الوظيفة المراد التقدم عليها' },
        options: [], // from api - waiting ali / and after get it from api if there are no data hide the form and show a message no jobs available
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' }
          }
        }
      },
      {
        name: 'CvFile',
        type: 'file',
        label: { en: 'CV', ar: 'السيرة الذاتية' },
        required: true,
        acceptedFileTypes: '.pdf,.doc,.docx',
        maxFileSize: 1048576,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'حقل مطلوب' }
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