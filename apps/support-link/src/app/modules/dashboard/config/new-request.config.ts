import { HttpMethod } from "@support-link/core/http";
import { DynamicFormConfig, FormFieldType } from "@support-link/shared/ui";
import { environment } from "apps/support-link/src/environments/environment";

export const NEW_REQUEST_CONFIG: DynamicFormConfig = {
  endpoint: `${environment.contentUrl}/request`,
  method: HttpMethod.POST,
  successMessage: {
    en: 'Your request has been submitted successfully',
    ar: 'تم إرسال طلبك بنجاح'
  },
  errorMessage: {
    en: 'Failed to submit request. Please try again',
    ar: 'فشل في إرسال الطلب. يرجى المحاولة مرة أخرى'
  },
  fields: [
    {
      name: 'ServiceId',
      type: FormFieldType.Select,
      label: { en: 'Service Title', ar: 'الخدمة المطلوبة' },
      required: true,
      options: [],
      validation: {
        required: true,
        errorMessages: {
          required: { en: 'Service is required', ar: 'هذا الحقل مطلوب' }
        }
      }
    },
    {
      name: 'Description',
      type: FormFieldType.Textarea,
      label: { en: 'Request Description', ar: 'وصف الطلب' },
      placeholder: { en: 'Please enter your problem details here', ar: 'الرجاء إدخال تفاصيل مشكلتك هنا' },
      required: true,
      maxLength: 250,
      rows: 4,
      validation: {
        required: true,
        maxLength: 250,
        errorMessages: {
          required: { en: 'Description is required', ar: 'هذا الحقل مطلوب' },
          maxLength: { en: 'Description cannot exceed 250 characters', ar: 'الحد الأقصى المسموح به 250 أحرف' }
        }
      }
    },
    {
      name: 'PriorityId',
      type: FormFieldType.Radio,
      label: { en: 'Priority', ar: 'الأولوية' },
      required: true,
      options: [],
      lookupDomain: environment.contentUrl,
      showOnValues: [122],
      lookupName: 'Priority'
    },
    {
      name: 'ContactDate',
      type: FormFieldType.Date,
      label: { en: 'Preferred Contact Date', ar: 'تاريخ الاتصال المفضل' },
      required: true,
      validation: {
        required: true,
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        errorMessages: {
          required: { en: 'date is required', ar: 'هذا الحقل مطلوب' },
          pattern: { en: 'Please enter a valid date (YYYY-MM-DD)', ar: 'يرجى إدخال تاريخ صحيح (YYYY-MM-DD)' }
        }
      }
    },
    {
      name: 'ContactTimeId',
      type: FormFieldType.Select,
      label: { en: 'Preferred Contact Time', ar: 'وقت الاتصال المفضل' },
      required: true,
      options: [],
      lookupDomain: environment.contentUrl,
      showOnValues: [122],
      lookupName: 'ContactTime'
    },
    {
      name: 'Attachments',
      type: FormFieldType.File,
      label: { en: 'Attach File', ar: 'إرفاق الملف' },
      required: true,
      acceptedFileTypes: '.docx,.pdf,.png,.jpg,.jpeg',
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