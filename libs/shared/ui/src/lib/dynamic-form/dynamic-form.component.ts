import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DynamicFormConfig, FormField, FormFieldOption, FormFieldLabel } from './dynamic-form.interface';
import { DynamicFormService } from './dynamic-form.service';
import { TextInputComponent } from '../form-fields/text-input/text-input.component';
import { EmailInputComponent } from '../form-fields/email-input/email-input.component';
import { RadioGroupComponent, RadioOption } from '../form-fields/radio-group/radio-group.component';
import { TextareaComponent } from '../form-fields/textarea/textarea.component';
import { FileUploadComponent } from '../form-fields/file-upload/file-upload.component';
import { PhoneInputComponent } from '../form-fields/phone-input/phone-input.component';
import { CheckboxGroupComponent } from '../form-fields/checkbox-group/checkbox-group.component';
import { SelectSearchComponent } from '../form-fields/select-search/select-search.component';
import { DatePickerComponent } from '../form-fields/date-picker/date-picker.component';
import { ChipsInputComponent } from '../form-fields/chips-input/chips-input.component';
import { CheckboxOption } from '../form-fields/checkbox-group/checkbox-group.component';
import { SelectOption } from '../form-fields/select-search/select-search.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { LookupService } from '@signtech/shared/utils';
import { InputRestriction } from '../enums/input-restriction.enum';
import { FormFieldType } from '../enums/form-fieldtype.enum';
import { environment } from 'apps/signtech/src/environments/environment';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextInputComponent,
    EmailInputComponent,
    RadioGroupComponent,
    TextareaComponent,
    FileUploadComponent,
    PhoneInputComponent,
    CheckboxGroupComponent,
    SelectSearchComponent,
    DatePickerComponent,
    ChipsInputComponent,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey
    }
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  public FormFieldType = FormFieldType;
  @Input() config!: DynamicFormConfig;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formError = new EventEmitter<any>();
  allowedRestrictions = ['numbers', 'english', 'arabic'];
  captchaToken: string | null = null;
  recaptchaSiteKey = environment.recaptchaSiteKey;

  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private formService: DynamicFormService,
    private translate: TranslateService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private lookupService: LookupService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initForm();
  }

  getTranslationKey(key: FormFieldLabel | string): string {
    if (typeof key === 'string') {
      return key;
    }

    return key[this.translate.currentLang as 'en' | 'ar'] || key.en;
  }

  onCaptchaResolved(token: string | null): void {
    this.captchaToken = token;
  }

  getErrorMessage(field: FormField, control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;
    const errorMessages = field.validation?.errorMessages || {};

    // Check for required error
    if (errors['required'] && errorMessages.required) {
      return this.getTranslationKey(errorMessages.required);
    }

    // Check for pattern error
    if (errors['pattern'] && errorMessages.pattern) {
      return this.getTranslationKey(errorMessages.pattern);
    }

    // Check for minLength error
    if (errors['minlength'] && errorMessages.minLength) {
      return this.getTranslationKey(errorMessages.minLength);
    }

    // Check for maxLength error
    if (errors['maxlength'] && errorMessages.maxLength) {
      return this.getTranslationKey(errorMessages.maxLength);
    }

    // Check for email error
    if (errors['email'] && errorMessages.email) {
      return this.getTranslationKey(errorMessages.email);
    }

    // Check for minDate error
    if (errors['minDate'] && errorMessages.minDate) {
      return this.getTranslationKey(errorMessages.minDate);
    }

    // Check for maxDate error
    if (errors['maxDate'] && errorMessages.maxDate) {
      return this.getTranslationKey(errorMessages.maxDate);
    }

    // Check for maxChips error
    if (errors['maxChips'] && errorMessages.maxChips) {
      return this.getTranslationKey(errorMessages.maxChips);
    }

    // Fallback to default error messages if no custom message is provided
    if (errors['required']) {
      return this.translate.instant('GENERAL.IS_REQUIRED');
    }

    if (errors['email']) {
      return this.translate.instant('GENERAL.INVALID_EMAIL');
    }

    if (errors['minlength']) {
      return this.translate.instant('GENERAL.MIN_LENGTH', { length: errors['minlength'].requiredLength });
    }

    if (errors['maxlength']) {
      return this.translate.instant('GENERAL.MAX_LENGTH', { length: errors['maxlength'].requiredLength });
    }

    if (errors['minDate']) {
      return this.translate.instant('GENERAL.MIN_DATE', { date: field.validation?.minDate });
    }

    if (errors['maxDate']) {
      return this.translate.instant('GENERAL.MAX_DATE', { date: field.validation?.maxDate });
    }

    if (errors['maxChips']) {
      return this.translate.instant('GENERAL.MAX_CHIPS', { count: field.validation?.maxChips });
    }

    return '';
  }

  transformToRadioOptions(options: FormFieldOption[]): RadioOption[] {
    return options.map(option => ({
      value: option.value,
      label: this.getTranslationKey(option.label)
    }));
  }

  // Add these methods alongside other transform methods
  transformToCheckboxOptions(options: FormFieldOption[]): CheckboxOption[] {
    return options.map(option => ({
      value: option.value,
      label: this.getTranslationKey(option.label)
    }));
  }

  transformToSelectOptions(options: FormFieldOption[]): SelectOption[] {
    return options.map(option => ({
      value: option.value,
      label: this.getTranslationKey(option.label)
    }));
  }

  private initForm() {
    const group: { [key: string]: any } = {};

    this.config.fields.forEach(field => {
      const validators: ValidatorFn[] = [];
      const validation = field.validation || {};

      if (validation.required || field.required) {
        validators.push(Validators.required);
      }
      if (validation.pattern) {
        validators.push(Validators.pattern(validation.pattern));
      }
      if (validation.minLength) {
        validators.push(Validators.minLength(validation.minLength));
      }
      if (validation.maxLength) {
        validators.push(Validators.maxLength(validation.maxLength));
      }
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      if (field.type === 'date') {
        if (validation.minDate) {
          validators.push(this.minDateValidator(validation.minDate));
        }
        if (validation.maxDate) {
          validators.push(this.maxDateValidator(validation.maxDate));
        }
      }
      if (field.type === 'chips') {
        if (validation.maxChips) {
          validators.push(this.maxChipsValidator(validation.maxChips));
        }
      }

      group[field.name] = new FormControl(
        { value: field.value ?? '', disabled: field.disabled ?? false },
        validators
      );
    });

    this.form = this.fb.group(group);

    this.config.fields.forEach(field => {
      if (field.dependsOn) {
        const dependsOnControl = this.form.get(field.dependsOn);
        if (dependsOnControl) {
          // Set initial hidden state
          if (field.showOnValues) {
            field.hidden = !field.showOnValues.includes(dependsOnControl.value);
          } else {
            field.hidden = !dependsOnControl.value;
          }
          if (field.hidden) {
            this.form.get(field.name)?.disable();
          }

          dependsOnControl.valueChanges.subscribe(parentValue => {
            // Determine visibility
            if (field.showOnValues) {
              field.hidden = !field.showOnValues.includes(parentValue);
            } else {
              field.hidden = !parentValue;
            }

            if (field.hidden) {
              field.options = [];
              this.form.get(field.name)?.reset();
              this.form.get(field.name)?.disable();
            } else {
              // Fetch options if needed
              if (field.lookupDomain && field.lookupName) {
                this.lookupService.getLookup(field.lookupDomain, field.lookupName, parentValue).subscribe(options => {
                  field.options = options.map(o => ({
                    value: o.Id,
                    label: { en: o.TitleEn || o.Title, ar: o.Title }
                  }));
                  this.form.get(field.name)?.enable();
                  this.cdr.detectChanges();
                });
              } else {
                this.form.get(field.name)?.enable();
                this.cdr.detectChanges();
              }
            }

            this.cdr.detectChanges();
          });
        }
      }
    });
  }

  private minDateValidator(minDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      const min = new Date(minDate);
      return date >= min ? null : { minDate: true };
    };
  }

  private maxDateValidator(maxDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      const max = new Date(maxDate);
      return date <= max ? null : { maxDate: true };
    };
  }

  private maxChipsValidator(maxChips: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length <= maxChips ? null : { maxChips: true };
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.recaptchaV3Service.execute('your_action_name').subscribe(
        (token) => {
          this.isSubmitting = true;
          this.errorMessage = '';
          this.successMessage = '';

          // Determine if the form should be sent as JSON or FormData
          const isJsonRequest = !this.config.fields.some(field => field.type === 'file');
          let formData: any;

          if (isJsonRequest) {
            formData = this.form.getRawValue();
          } else {
            formData = new FormData();
            const rawValues = this.form.getRawValue();
            this.config.fields.forEach(field => {
              const key = field.name;
              const value = rawValues[key];
              if (field.type === 'file') {
                if (value instanceof File || value instanceof Blob) {
                  formData.append(key, value);
                }
              } else if (Array.isArray(value) && field.type === FormFieldType.Checkbox) {
                value.forEach((v: any) => formData.append(key, v));
              } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
              }
            });
          }

          // Call the appropriate service method
          const submitMethod = isJsonRequest
            ? this.formService.submitForm(this.config, formData, token)
            : this.formService.submitFormData(this.config, formData, token);

          submitMethod.subscribe({
            next: (response) => {
              this.isSubmitting = false;
              if (response && response.Success === false) {
                this.errorMessage = response.Message || this.translate.instant('GENERAL.FORM_SUBMIT_ERROR');
                this.successMessage = '';
                this.formError.emit(response);
              } else {
                this.formSubmitted.emit(response);
                this.successMessage = this.config.successMessage
                  ? this.getTranslationKey(this.config.successMessage)
                  : this.translate.instant('GENERAL.FORM_SUBMIT_SUCCESS');
                this.errorMessage = '';
                this.form.reset();
              }
            },
            error: (error) => {
              this.isSubmitting = false;
              this.errorMessage = this.config.errorMessage
                ? this.getTranslationKey(this.config.errorMessage)
                : (error.error?.message || this.translate.instant('GENERAL.FORM_SUBMIT_ERROR'));
              this.formError.emit(error);
            }
          });
        },
        (error) => {
          console.error('reCAPTCHA error:', error);
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  onClear() {
    this.form.reset();
    this.errorMessage = '';
    this.successMessage = '';
    // Reset touched state of all controls
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsUntouched();
    });
  }

  getInputRestriction(value: string | undefined): InputRestriction | undefined {
    return Object.values(InputRestriction).includes(value as InputRestriction)
      ? (value as InputRestriction)
      : undefined;
  }
}