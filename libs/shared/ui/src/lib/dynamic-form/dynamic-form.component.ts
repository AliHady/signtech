import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DynamicFormConfig, FormField, TranslationKey, FormFieldOption, FormFieldLabel } from './dynamic-form.interface';
import { DynamicFormService } from './dynamic-form.service';
import { TextInputComponent } from '../form-fields/text-input/text-input.component';
import { EmailInputComponent } from '../form-fields/email-input/email-input.component';
import { RadioGroupComponent, RadioOption } from '../form-fields/radio-group/radio-group.component';
import { TextareaComponent } from '../form-fields/textarea/textarea.component';
import { FileUploadComponent } from '../form-fields/file-upload/file-upload.component';
import { PhoneInputComponent } from '../form-fields/phone-input/phone-input.component';
import { CheckboxGroupComponent } from '../form-fields/checkbox-group/checkbox-group.component';
import { SelectSearchComponent } from '../form-fields/select-search/select-search.component';
import { CheckboxOption } from '../form-fields/checkbox-group/checkbox-group.component';
import { SelectOption } from '../form-fields/select-search/select-search.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'apps/Portal/src/environments/environment';

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
  @Input() config!: DynamicFormConfig;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formError = new EventEmitter<any>();

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
    private recaptchaV3Service: ReCaptchaV3Service) { }

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
    console.log(token)
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

      group[field.name] = ['', validators];
    });

    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      this.recaptchaV3Service.execute('your_action_name').subscribe(
        (token) => {
          console.log(token)
          this.isSubmitting = true;
          this.errorMessage = '';
          this.successMessage = '';

          this.formService.submitForm(this.config, this.form.value, token).subscribe({
            next: (response) => {
              this.isSubmitting = false;
              this.formSubmitted.emit(response);
              this.successMessage = this.config.successMessage
                ? this.getTranslationKey(this.config.successMessage)
                : this.translate.instant('GENERAL.FORM_SUBMIT_SUCCESS');
              this.form.reset();
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
}