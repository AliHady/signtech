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
          <ng-container *ngIf="required && requiredIndicatorPosition === 'before'">
            <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold me-1'">*</span>
          </ng-container>
          {{ label | translate }}
          <ng-container *ngIf="required && requiredIndicatorPosition === 'after'">
            <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold ms-1'">*</span>
          </ng-container>
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
            {{ 'This field is required' | translate }}
          } @else if (control.errors?.['invalidFormat']) {
            {{ 'Only numbers are allowed' | translate }}
          } @else if (control.errors?.['invalidPrefix']) {
            {{ 'Phone number must start with 0 or 5' | translate }}
          } @else if (control.errors?.['invalidLength']) {
            @if (value.startsWith('0')) {
              {{ 'Phone number starting with 0 must be 10 digits' | translate }}
            } @else {
              {{ 'Phone number starting with 5 must be 9 digits' | translate }}
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
    // Only allow numbers
    const value = input.value.replace(/[^0-9]/g, '');
    this.value = value;
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