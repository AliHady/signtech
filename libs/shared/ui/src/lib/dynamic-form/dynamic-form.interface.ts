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
  type: 'text' | 'email' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'phone' | 'file' | 'date' | 'chips';
  label: FormFieldLabel;
  required?: boolean;
  options?: FormFieldOption[];
  maxLength?: number;
  placeholder?: FormFieldLabel;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  rows?: number;
  minDate?: string;
  maxDate?: string;
  maxChips?: number;
  allowDuplicates?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    minDate?: string;
    maxDate?: string;
    maxChips?: number;
    errorMessages?: {
      required?: FormFieldLabel;
      pattern?: FormFieldLabel;
      minLength?: FormFieldLabel;
      maxLength?: FormFieldLabel;
      email?: FormFieldLabel;
      minDate?: FormFieldLabel;
      maxDate?: FormFieldLabel;
      maxChips?: FormFieldLabel;
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