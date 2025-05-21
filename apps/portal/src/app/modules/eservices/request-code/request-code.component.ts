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
    endpoint: '/request-code',
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
        name: 'EnglishEntity',
        type: 'text',
        label: { en: 'Entity Name in English', ar: 'إسم الجهة باللغة الإنجليزية' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          pattern: '^[a-zA-Z].{1,50}',
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Please enter entity name in English', ar: 'يجب ادخال اسم الجهة باللغة الإنجليزية' }
          }
        }
      },
      {
        name: 'SelectedEntityType',
        type: 'select',
        label: { en: 'Entity Type', ar: 'نوع الجهة' },
        required: true,
        options: [
          { value: 1, label: { en: 'Civil Standards Organizations', ar: 'منظمات المعايير والمعايير المدنية، بما في ذلك منظمات المعاييرالحكومية غير العسكرية' } },
          { value: 2, label: { en: 'Non-US Manufacturers', ar: 'الشركات المصنعة غير الأمريكية' } },
          { value: 3, label: { en: 'Non-Manufacturers', ar: 'غير المصنّعين - كيانات من الأنواع التالية التي لا تصنع: - البائعون / الموزعون - مكاتب البيع - مؤسسات البيع بالتجزئة - مؤسسات البيع بالجملة أو التوظيف' } },
          { value: 4, label: { en: 'Service Providers', ar: 'مقدمو الخدمات' } },
          { value: 5, label: { en: 'Departments or Units', ar: 'الدوائر أو الوحدات' } },
          { value: 6, label: { en: 'Military Standards Organizations', ar: 'منظمات المعايير والمعايير العسكرية' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Please select entity type', ar: 'يرجى اختيار نوع الجهة' }
          }
        }
      },
      {
        name: 'CommercialRegistration',
        type: 'text',
        label: { en: 'Commercial Registration Number', ar: 'رقم السجل التجاري' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'CRFile',
        type: 'file',
        label: { en: 'Commercial Registration', ar: 'السجل التجاري' },
        required: true
      },
      {
        name: 'CountryEnglish',
        type: 'text',
        label: { en: 'Country Name in English', ar: 'إسم الدولة باللغة الإنجليزية' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          pattern: '^[a-zA-Z].{1,50}',
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Please enter country name in English', ar: 'يجب ادخال اسم الدولة باللغة الإنجليزية' }
          }
        }
      },
      {
        name: 'StreetNameEn',
        type: 'text',
        label: { en: 'Street Name in English', ar: 'إسم الشارع باللغة الإنجليزية' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          pattern: '^[a-zA-Z].{1,50}',
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Please enter street name in English', ar: 'يجب ادخال اسم الشارع باللغة الإنجليزية' }
          }
        }
      },
      {
        name: 'POBOXNO',
        type: 'text',
        label: { en: 'P.O. Box', ar: 'صندوق البريد' },
        maxLength: 250
      },
      {
        name: 'Telephone',
        type: 'text',
        label: { en: 'Telephone Number', ar: 'رقم الهاتف' },
        maxLength: 200
      },
      {
        name: 'Fax',
        type: 'text',
        label: { en: 'Fax Number', ar: 'رقم الفاكس' },
        maxLength: 200
      },
      {
        name: 'MobileNumber',
        type: 'text',
        label: { en: 'Mobile Number', ar: 'رقم الجوال' },
        required: true,
        maxLength: 250,
        validation: {
          required: true,
          pattern: '^(05)(5|0|3|6|4|9|1|8|7)([0-9]{7})$',
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Invalid number format, please enter a valid format', ar: 'صيغة الرقم خاظئة ، من فضلك أدخل صيغة صحيحة' }
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
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'RegionCityEnglish',
        type: 'text',
        label: { en: 'Region/City in English', ar: 'المنطقة باللغة الإنجليزية' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          pattern: '^[a-zA-Z].{1,50}',
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Please enter region/city name in English', ar: 'يجب ادخال اسم المنطقة باللغة الإنجليزية' }
          }
        }
      },
      {
        name: 'CountryArabic',
        type: 'text',
        label: { en: 'City in English', ar: 'المدينة باللغة الإنجليزية' },
        maxLength: 200
      },
      {
        name: 'LicenseNumber',
        type: 'text',
        label: { en: 'Postal Code', ar: 'الرمز البريدي' },
        required: true,
        maxLength: 200,
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'This field is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'SelectedArabicEntity',
        type: 'select',
        label: { en: 'Entity Type', ar: 'نوع المنشاة' },
        required: true,
        options: [
          { value: 1, label: { en: 'Factory', ar: 'مصنع' } },
          { value: 2, label: { en: 'Supplier', ar: 'مورد' } },
          { value: 3, label: { en: 'Distributor', ar: 'موزع' } },
          { value: 4, label: { en: 'Service Provider', ar: 'مقدم خدمات' } },
          { value: 5, label: { en: 'Government', ar: 'حكومي' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Please select entity type', ar: 'يرجى اختيار نوع المنشاة' }
          }
        }
      },
      {
        name: 'Location',
        type: 'text',
        label: { en: 'Entity Location URL', ar: 'رابط عنوان المنشأة على الانترنت' },
        maxLength: 250
      },
      {
        name: 'StreetArName',
        type: 'text',
        label: { en: 'Main Activity', ar: 'النشاط الرئيسي للمنشاة' },
        maxLength: 200,
        placeholder: { en: 'Example: Plastic Materials Manufacturing', ar: 'مثال:صناعة مواد بلاستيكية' }
      },
      {
        name: 'SelectedLicenseDate',
        type: 'select',
        label: { en: 'Status', ar: 'الحالة' },
        required: true,
        options: [
          { value: 1, label: { en: 'Active', ar: 'نشط' } },
          { value: 2, label: { en: 'Inactive', ar: 'غير نشط' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Please select status', ar: 'يرجى اختيار الحالة' }
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