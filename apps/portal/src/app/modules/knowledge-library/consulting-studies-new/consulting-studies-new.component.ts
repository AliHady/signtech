import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent, DynamicFormConfig } from '@nimic/shared/ui';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulting-studies-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  templateUrl: './consulting-studies-new.component.html',
  styleUrls: ['./consulting-studies-new.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ConsultingStudiesNewComponent {
  formConfig: DynamicFormConfig = {
    endpoint: '/consulting-studies',
    method: 'POST',
    successMessage: {
      en: 'Your study has been submitted successfully',
      ar: 'تم إرسال دراستك بنجاح'
    },
    errorMessage: {
      en: 'Failed to submit study. Please try again',
      ar: 'فشل في إرسال الدراسة. يرجى المحاولة مرة أخرى'
    },
    fields: [
      {
        name: 'NameAr',
        type: 'text',
        label: { en: 'Study Name', ar: 'اسم الدراسة' },
        required: true,
        maxLength: 100,
        validation: {
          required: true,
          maxLength: 100,
          errorMessages: {
            required: { en: 'Study name is required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Study name cannot exceed 100 characters', ar: 'لا يمكن أن يتجاوز اسم الدراسة 100 حرف' }
          }
        }
      },
      {
        name: 'StudySubject',
        type: 'text',
        label: { en: 'Study Subject', ar: 'موضوع الدراسة' },
        required: true,
        maxLength: 100,
        validation: {
          required: true,
          maxLength: 100,
          errorMessages: {
            required: { en: 'Study subject is required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Study subject cannot exceed 100 characters', ar: 'لا يمكن أن يتجاوز موضوع الدراسة 100 حرف' }
          }
        }
      },
      {
        name: 'CompanyName',
        type: 'text',
        label: { en: 'Company Name', ar: 'اسم الشركة المنفذة' },
        required: true,
        maxLength: 100,
        validation: {
          required: true,
          maxLength: 100,
          errorMessages: {
            required: { en: 'Company name is required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Company name cannot exceed 100 characters', ar: 'لا يمكن أن يتجاوز اسم الشركة 100 حرف' }
          }
        }
      },
      {
        name: 'StudyDate',
        type: 'date',
        label: { en: 'Study Documents Date', ar: 'تاريخ إصدار وثائق الدراسة' },
        required: true,
        validation: {
          required: true,
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          errorMessages: {
            required: { en: 'Study date is required', ar: 'هذا الحقل مطلوب' },
            pattern: { en: 'Please enter a valid date (YYYY-MM-DD)', ar: 'يرجى إدخال تاريخ صحيح (YYYY-MM-DD)' }
          }
        }
      },
      {
        name: 'StudySubjectId',
        type: 'select',
        label: { en: 'Sector', ar: 'القطاع' },
        required: true,
        options: [
          { value: 1, label: { en: 'Governance', ar: 'حوكمة' } },
          { value: 2, label: { en: 'Procedures', ar: 'إجراءات' } },
          { value: 3, label: { en: 'Strategy', ar: 'إستراتيجية' } },
          { value: 4, label: { en: 'Use Case', ar: 'حالة استخدام' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Sector is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'StudyTypeId',
        type: 'select',
        label: { en: 'Study Type', ar: 'نوع الدراسة' },
        required: true,
        options: [
          { value: 1, label: { en: 'Ministry of Industry and Mineral Resources', ar: 'وزارة الصناعة والثروة المعدنية' } },
          { value: 2, label: { en: 'Industrial Center', ar: 'المركز الصناعي' } },
          { value: 3, label: { en: 'Saudi Export Development Authority', ar: 'هيئة تنمية الصادرات السعودية' } },
          { value: 4, label: { en: 'Saudi Geological Survey', ar: 'هيئة المساحة الجيولوجية السعودية' } },
          { value: 5, label: { en: 'Saudi Export-Import Bank', ar: 'بنك التصدير والاستيراد السعودي' } },
          { value: 6, label: { en: 'National Industrial Development and Logistics Program', ar: 'برنامج تطوير الصناعة الوطنية والخدمات اللوجستية' } },
          { value: 7, label: { en: 'Royal Commission for Jubail and Yanbu', ar: 'الهيئة الملكية للجبيل وينبع' } },
          { value: 8, label: { en: 'Local Content and Government Procurement Authority', ar: 'هيئة المحتوى المحلي والمشتريات الحكومية' } },
          { value: 9, label: { en: 'Saudi Industrial Development Fund', ar: 'صندوق التنمية الصناعية السعودي' } },
          { value: 10, label: { en: 'Saudi Authority for Industrial Cities and Technology Zones', ar: 'الهيئة السعودية للمدن الصناعية ومناطق التقنية' } },
          { value: 11, label: { en: 'National Center for Industrial and Mining Information', ar: 'المركز الوطني للمعلومات الصناعية والتعدينية' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Study type is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'MainSubjectId',
        type: 'select',
        label: { en: 'Main Study Axis', ar: 'المحور الرئيسي للدراسة' },
        required: true,
        options: [
          { value: 1, label: { en: 'Main Axis 1', ar: 'المحور الرئيسي1' } },
          { value: 2, label: { en: 'Main Axis 2', ar: 'المحور الرئيسي2' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Main study axis is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'Keywords',
        type: 'chips',
        label: { en: 'Keywords', ar: 'الكلمات المفتاحية' },
        required: true,
        maxLength: 100,
        placeholder: { en: 'Separate keywords with semicolon (;)', ar: 'يرجى الفصل بين الكلمات بفاصله منقوطة ;' },
        validation: {
          required: true,
          maxLength: 100,
          errorMessages: {
            required: { en: 'Keywords are required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Keywords cannot exceed 100 characters', ar: 'لا يمكن أن تتجاوز الكلمات المفتاحية 100 حرف' }
          }
        }
      },
      {
        name: 'Description',
        type: 'textarea',
        label: { en: 'Study Summary', ar: 'موجز عن الدراسة' },
        required: true,
        maxLength: 250,
        rows: 4,
        validation: {
          required: true,
          maxLength: 250,
          errorMessages: {
            required: { en: 'Study summary is required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Study summary cannot exceed 250 characters', ar: 'الحد الأقصى المسموح به 250 أحرف' }
          }
        }
      },
      {
        name: 'ContractName',
        type: 'text',
        label: { en: 'Contract Name', ar: 'اسم العقد' },
        required: true,
        maxLength: 100,
        validation: {
          required: true,
          maxLength: 100,
          errorMessages: {
            required: { en: 'Contract name is required', ar: 'هذا الحقل مطلوب' },
            maxLength: { en: 'Contract name cannot exceed 100 characters', ar: 'لا يمكن أن يتجاوز اسم العقد 100 حرف' }
          }
        }
      },
      {
        name: 'ContractNo',
        type: 'text',
        label: { en: 'Contract Number', ar: 'رقم العقد' },
        maxLength: 100
      },
      {
        name: 'BudgetItemNo',
        type: 'text',
        label: { en: 'Budget Item Number', ar: 'رقم بند الميزانية' },
        maxLength: 100
      },
      {
        name: 'PrivacyTypeId',
        type: 'radio',
        label: { en: 'Access Permission', ar: 'صلاحية الوصول' },
        required: true,
        options: [
          { value: 1, label: { en: 'Public', ar: 'عام' } },
          { value: 3, label: { en: 'Restricted', ar: 'مقيد' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Access permission is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'StudyPrivacyTypeId',
        type: 'radio',
        label: { en: 'Confidentiality Classification', ar: 'تصنيف السرية' },
        required: true,
        options: [
          { value: 1, label: { en: 'Public', ar: 'عام' } },
          { value: 2, label: { en: 'Confidential', ar: 'سري' } }
        ],
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'Confidentiality classification is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      },
      {
        name: 'Files',
        type: 'file',
        label: { en: 'Attach File', ar: 'إرفاق الملف' },
        required: true,
        acceptedFileTypes: '.docx,.pdf',
        maxFileSize: 1, 
        validation: {
          required: true,
          errorMessages: {
            required: { en: 'File is required', ar: 'هذا الحقل مطلوب' }
          }
        }
      }
    ],
    submitButtonLabel: { en: 'Submit', ar: 'ارسال' },
    clearButtonLabel: { en: 'Clear', ar: 'مسح' }
  };

  constructor() { }

  onFormSubmitted(response: any) {
    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }
}