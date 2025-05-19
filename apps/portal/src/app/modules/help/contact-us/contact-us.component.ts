import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../../eservices/services/e-services.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';
import { RadioGroupComponent, TextInputComponent, EmailInputComponent, TextareaComponent } from '@nimic/shared/ui';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
    ReactiveFormsModule,
    RadioGroupComponent,
    TextInputComponent,
    EmailInputComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
    TextareaComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactUsComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/CMS/api/contact-us',
    method: 'POST',
    successMessage: {
      en: 'Your message has been sent successfully',
      ar: 'تم إرسال رسالتك بنجاح'
    },
    errorMessage: {
      en: 'Failed to send message. Please try again',
      ar: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى'
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
            required: { en: 'Please select a contact type', ar: 'يرجى اختيار نوع التواصل' }
          }
        }
      },
      {
        name: 'subject',
        type: 'text',
        label: { en: 'Subject', ar: 'الموضوع' },
        required: true,
        maxLength: 200,
        placeholder: { en: 'Enter subject', ar: 'أدخل الموضوع' },
        validation: {
          required: true,
          maxLength: 200,
          errorMessages: {
            required: { en: 'Subject is required', ar: 'الموضوع مطلوب' },
            maxLength: { en: 'Subject cannot exceed 200 characters', ar: 'لا يمكن أن يتجاوز الموضوع 200 حرف' }
          }
        }
      },
      {
        name: 'fullName',
        type: 'text',
        label: { en: 'Full Name', ar: 'الاسم الكامل' },
        required: true,
        maxLength: 200,
        placeholder: { en: 'Enter your full name', ar: 'أدخل اسمك الكامل' },
        validation: {
          required: true,
          maxLength: 200,
          errorMessages: {
            required: { en: 'Full name is required', ar: 'الاسم الكامل مطلوب' },
            maxLength: { en: 'Full name cannot exceed 200 characters', ar: 'لا يمكن أن يتجاوز الاسم الكامل 200 حرف' }
          }
        }
      },
      {
        name: 'email',
        type: 'email',
        label: { en: 'Email', ar: 'البريد الإلكتروني' },
        required: true,
        maxLength: 250,
        placeholder: { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
        validation: {
          required: true,
          maxLength: 250,
          errorMessages: {
            required: { en: 'Email is required', ar: 'البريد الإلكتروني مطلوب' },
            email: { en: 'Please enter a valid email address', ar: 'يرجى إدخال عنوان بريد إلكتروني صحيح' },
            maxLength: { en: 'Email cannot exceed 250 characters', ar: 'لا يمكن أن يتجاوز البريد الإلكتروني 250 حرف' }
          }
        }
      },
      {
        name: 'message',
        type: 'textarea',
        label: { en: 'Message', ar: 'الرسالة' },
        required: true,
        maxLength: 400,
        placeholder: { en: 'Enter your message', ar: 'أدخل رسالتك' },
        validation: {
          required: true,
          maxLength: 400,
          errorMessages: {
            required: { en: 'Message is required', ar: 'الرسالة مطلوبة' },
            maxLength: { en: 'Message cannot exceed 400 characters', ar: 'لا يمكن أن تتجاوز الرسالة 400 حرف' }
          }
        }
      }
    ],
    submitButtonLabel: { en: 'Submit', ar: 'إرسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' }
  };

  constructor(private eServicesService: EServicesService) {}

  onFormSubmitted(response: any) {
    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }
}