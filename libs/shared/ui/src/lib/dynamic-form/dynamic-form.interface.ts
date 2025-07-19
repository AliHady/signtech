import { HttpMethod } from "@support-link/core/http";
import { FormFieldType } from "../enums/form-fieldtype.enum";
import { InputRestriction } from "../enums/input-restriction.enum";

export interface FormFieldLabel {
  en: string;
  ar: string;
}

export interface FormFieldOption {
  value: string;
  label: FormFieldLabel;
}

export interface FormField {
  name: string;
  inputRestriction?: InputRestriction;
  type: FormFieldType;
  label: FormFieldLabel;
  required?: boolean;
  options?: FormFieldOption[];
  hidden?: boolean;
  dependsOn?: string;
  showOnValues?: any[];
  lookupDomain?: string;
  lookupName?: string;
  maxLength?: number;
  placeholder?: FormFieldLabel;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  rows?: number;
  minDate?: string;
  maxDate?: string;
  maxChips?: number;
  allowDuplicates?: boolean;
  disabled?: boolean;
  value?: any;
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
  method: HttpMethod;
  fields: FormField[];
  submitButtonLabel?: FormFieldLabel;
  clearButtonLabel?: FormFieldLabel;
  successMessage?: FormFieldLabel;
  errorMessage?: FormFieldLabel;
}

// Helper type for translation
export type TranslationKey = string;