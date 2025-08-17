import { HttpMethod } from "@signtech/core/http";
import { DynamicFormConfig, FormFieldType } from "@signtech/shared/ui";
import { environment } from "apps/signtech/src/environments/environment";

export const UPDATE_PROFILE_OTP_CONFIG: DynamicFormConfig = {
  endpoint: `${environment.apiUrl}/customer/verify-otp-update-profile`,
  method: HttpMethod.POST,
  successMessage: {
    en: 'Your profile has been updated successfully',
    ar: 'تم تحديث ملفك الشخصي بنجاح'
  },
  errorMessage: {
    en: 'Failed to update profile. Please try again',
    ar: 'فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى'
  },
  fields: [
    {
      name: 'Email',
      type: FormFieldType.Email,
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
      required: true,
      hidden: true,
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
      name: 'Otp',
      type: FormFieldType.Text,
      label: { en: 'Otp', ar: 'رمز التحقق' },
      required: true,
      maxLength: 6,
      validation: {
        required: true,
        errorMessages: {
          required: { en: 'This field is required', ar: 'حقل مطلوب' }
        }
      }
    }
  ],
  submitButtonLabel: { en: 'Update Profile', ar: 'تحديث الملف الشخصي' },
  clearButtonLabel: { en: 'Clear', ar: 'مسح' }
};