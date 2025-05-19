export interface FormFieldLabel {
  en: string;
  ar: string;
}

export interface FormFieldOption {
  value: number;
  label: FormFieldLabel;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'phone' | 'file';
  label: FormFieldLabel;
  required?: boolean;
  options?: FormFieldOption[];
  maxLength?: number;
  placeholder?: FormFieldLabel;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    errorMessages?: {
      required?: FormFieldLabel;
      pattern?: FormFieldLabel;
      minLength?: FormFieldLabel;
      maxLength?: FormFieldLabel;
      email?: FormFieldLabel;
    };
  };
}

export interface DynamicFormConfig {
  endpoint: string;
  method: 'POST' | 'PUT' | 'GET' | 'DELETE';
  fields: FormField[];
  submitButtonLabel?: FormFieldLabel;
  clearButtonLabel?: FormFieldLabel;
  successMessage?: FormFieldLabel;
  errorMessage?: FormFieldLabel;
}

// Helper type for translation
export type TranslationKey = string;