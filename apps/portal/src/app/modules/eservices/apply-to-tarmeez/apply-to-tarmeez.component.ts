import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../services/e-services.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';

@Component({
  selector: 'app-apply-to-tarmeez',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
   
  ],
  templateUrl: './apply-to-tarmeez.component.html',
  styleUrls: ['./apply-to-tarmeez.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ApplyToTarmeezComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/CMS/api/apply-to-tarmeez',
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
        name: 'organizationName',
        type: 'text',
        label: { en: 'Organization Name', ar: 'اسم المؤسسة' },
        required: true,
        maxLength: 200,
        placeholder: { en: 'Enter organization name', ar: 'أدخل اسم المؤسسة' },
        validation: {
          required: true,
          maxLength: 200,
          errorMessages: {
            required: { en: 'Organization name is required', ar: 'اسم المؤسسة مطلوب' },
            maxLength: { en: 'Organization name cannot exceed 200 characters', ar: 'لا يمكن أن يتجاوز اسم المؤسسة 200 حرف' }
          }
        }
      },
      {
        name: 'communicationSupervisorName',
        type: 'text',
        label: { en: 'Communication Supervisor Name', ar: 'اسم مشرف الاتصال' },
        required: true,
        maxLength: 200,
        placeholder: { en: 'Enter supervisor name', ar: 'أدخل اسم المشرف' },
        validation: {
          required: true,
          maxLength: 200,
          errorMessages: {
            required: { en: 'Supervisor name is required', ar: 'اسم المشرف مطلوب' },
            maxLength: { en: 'Supervisor name cannot exceed 200 characters', ar: 'لا يمكن أن يتجاوز اسم المشرف 200 حرف' }
          }
        }
      },
      {
        name: 'mobileNumber',
        type: 'phone',
        label: { en: 'Mobile Number', ar: 'رقم الجوال' },
        required: true,
        maxLength: 200,
        placeholder: { en: 'Enter mobile number', ar: 'أدخل رقم الجوال' },
        validation: {
          required: true,
          maxLength: 200,
          errorMessages: {
            required: { en: 'Mobile number is required', ar: 'رقم الجوال مطلوب' },
            maxLength: { en: 'Mobile number cannot exceed 200 characters', ar: 'لا يمكن أن يتجاوز رقم الجوال 200 حرف' }
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
        name: 'crFile',
        type: 'file',
        label: { en: 'CR File', ar: 'ملف السجل التجاري' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'CR file is required', ar: 'ملف السجل التجاري مطلوب' }
          }
        }
      },
      {
        name: 'taxFile',
        type: 'file',
        label: { en: 'Tax File', ar: 'ملف الضريبة' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Tax file is required', ar: 'ملف الضريبة مطلوب' }
          }
        }
      },
      {
        name: 'gosiFile',
        type: 'file',
        label: { en: 'GOSI File', ar: 'ملف التأمينات' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'GOSI file is required', ar: 'ملف التأمينات مطلوب' }
          }
        }
      },
      {
        name: 'financialStatementsFile',
        type: 'file',
        label: { en: 'Financial Statements File', ar: 'ملف البيانات المالية' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Financial statements file is required', ar: 'ملف البيانات المالية مطلوب' }
          }
        }
      },
      {
        name: 'investmentLicenseFile',
        type: 'file',
        label: { en: 'Investment License File', ar: 'ملف رخصة الاستثمار' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Investment license file is required', ar: 'ملف رخصة الاستثمار مطلوب' }
          }
        }
      },
      {
        name: 'chamberOfCommerceCertificateFile',
        type: 'file',
        label: { en: 'Chamber of Commerce Certificate File', ar: 'ملف شهادة الغرفة التجارية' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Chamber of commerce certificate file is required', ar: 'ملف شهادة الغرفة التجارية مطلوب' }
          }
        }
      },
      {
        name: 'businessClassificationCertificateFile',
        type: 'file',
        label: { en: 'Business Classification Certificate File', ar: 'ملف شهادة تصنيف الأعمال' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Business classification certificate file is required', ar: 'ملف شهادة تصنيف الأعمال مطلوب' }
          }
        }
      },
      {
        name: 'certificateToTheSaudiCouncilOfEngineersFile',
        type: 'file',
        label: { en: 'Certificate to the Saudi Council of Engineers File', ar: 'ملف شهادة الهيئة السعودية للمهندسين' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Certificate to the Saudi Council of Engineers file is required', ar: 'ملف شهادة الهيئة السعودية للمهندسين مطلوب' }
          }
        }
      },
      {
        name: 'certificateOfAchievingTheRegularPercentageFile',
        type: 'file',
        label: { en: 'Certificate of Achieving the Regular Percentage File', ar: 'ملف شهادة تحقيق النسبة النظامية' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Certificate of achieving the regular percentage file is required', ar: 'ملف شهادة تحقيق النسبة النظامية مطلوب' }
          }
        }
      },
      {
        name: 'certificateOfExperienceFile',
        type: 'file',
        label: { en: 'Certificate of Experience File', ar: 'ملف شهادة الخبرة' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Certificate of experience file is required', ar: 'ملف شهادة الخبرة مطلوب' }
          }
        }
      },
      {
        name: 'priceOffer',
        type: 'file',
        label: { en: 'Price Offer', ar: 'عرض السعر' },
        required: false,
        acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        maxFileSize: 1048576,
        validation: {
          required: false,
          errorMessages: {
            required: { en: 'Price offer file is required', ar: 'ملف عرض السعر مطلوب' }
          }
        }
      }
    ],
    submitButtonLabel: { en: 'Submit', ar: 'إرسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' } 
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private eServicesService: EServicesService) {}

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