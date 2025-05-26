import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="space-y-2 mb-6">
      @if (label) {
        <label class="block text-sm font-medium text-gray-700">
          @if (required && requiredIndicatorPosition === 'before') {
            <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold me-1'">*</span>
          }
          {{ label | translate }}
          @if (required && requiredIndicatorPosition === 'after') {
            <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold ms-1'">*</span>
          }
        </label>
      }
      <input
        type="tel"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [placeholder]="placeholder"
        [attr.maxlength]="maxLength"
        class="w-full px-4 py-3 text-gray-700 border border-gray-300 focus:outline-none focus:border-[#1AD9C7] focus:ring-1 focus:ring-[#1AD9C7]"
        [ngStyle]="{'font-family': 'inherit', 'border-radius': '0', 'border': '1px solid #d1d5db', 'padding': '0.75rem 1rem'}"
        [disabled]="disabled"
      >
      @if (control && control.invalid && (control.touched || formSubmitted)) {
        <div class="text-sm text-red-600">
          @if (control.errors?.['required']) {
            {{ 'GENERAL.IS_REQUIRED' | translate }}
          } @else if (control.errors?.['invalidFormat']) {
            {{ 'PHONE.INVALID_FORMAT' | translate }}
          } @else if (control.errors?.['invalidPrefix']) {
            {{ 'PHONE.INVALID_PREFIX' | translate }}
          } @else if (control.errors?.['invalidLength']) {
            @if (value.startsWith('0')) {
              {{ 'PHONE.INVALID_LENGTH_0' | translate }}
            } @else {
              {{ 'PHONE.INVALID_LENGTH_5' | translate }}
            }
          }
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxLength = 10;
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';
  @Input() name = '';

  value = '';
  disabled = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Remove any non-numeric characters immediately
    const value = input.value.replace(/[^0-9]/g, '');
    // Limit the length to maxLength (10)
    const truncatedValue = value.slice(0, this.maxLength);
    // Update the input value directly to prevent any non-numeric characters from appearing
    input.value = truncatedValue;
    this.value = truncatedValue;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    }

    const value = control.value.toString();
    
    // Check if the value contains only numbers
    if (!/^\d+$/.test(value)) {
      return { invalidFormat: true };
    }

    // Check if the number starts with 0 or 5
    if (!value.startsWith('0') && !value.startsWith('5')) {
      return { invalidPrefix: true };
    }

    // Check length based on prefix
    if (value.startsWith('0') && value.length !== 10) {
      return { invalidLength: true };
    }
    if (value.startsWith('5') && value.length !== 9) {
      return { invalidLength: true };
    }

    return null;
  }
} 