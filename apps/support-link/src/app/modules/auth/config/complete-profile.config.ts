import { HttpMethod } from "@support-link/core/http";
import { DynamicFormConfig, FormFieldType } from "@support-link/shared/ui";
import { environment } from "apps/support-link/src/environments/environment";

export const COMPLETE_PROFILE_CONFIG: DynamicFormConfig = {
  endpoint: `${environment.apiUrl}/customer/complete-profile`,
  method: HttpMethod.POST,
  successMessage: {
    en: 'Your profile has been completed successfully',
    ar: 'تم إكمال ملفك الشخصي بنجاح'
  },
  errorMessage: {
    en: 'Failed to complete profile. Please try again',
    ar: 'فشل في إكمال الملف الشخصي. يرجى المحاولة مرة أخرى'
  },
  fields: [
    {
      name: 'Email',
      type: FormFieldType.Email,
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
      required: true,
      disabled: true,
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
      name: 'FirstName',
      type: FormFieldType.Text,
      label: { en: 'First Name', ar: 'الاسم الأول' },
      required: true,
      maxLength: 100,
      validation: {
        required: true,
        errorMessages: {
          required: { en: 'This field is required', ar: 'حقل مطلوب' }
        }
      }
    },
    {
      name: 'LastName',
      type: FormFieldType.Text,
      label: { en: 'Last Name', ar: 'اسم العائلة' },
      required: true,
      maxLength: 100,
      validation: {
        required: true,
        errorMessages: {
          required: { en: 'This field is required', ar: 'حقل مطلوب' }
        }
      }
    },
    {
      name: 'MobileNumber',
      type: FormFieldType.Text,
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
      name: 'Image',
      type: FormFieldType.File,
      label: { en: 'Attach Image', ar: 'إرفاق الصورة' },
      required: true,
      acceptedFileTypes: '.png,.jpg,.jpeg',
      maxFileSize: 1,
      validation: {
        required: true,
        errorMessages: {
          required: { en: 'File is required', ar: 'هذا الحقل مطلوب' }
        }
      }
    }
  ],
  submitButtonLabel: { en: 'Complete Profile', ar: 'إكمال الملف الشخصي' },
  clearButtonLabel: { en: 'Clear', ar: 'مسح' }
};