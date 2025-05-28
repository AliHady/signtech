import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="mb-6">
      <div class="flex items-center gap-4">
        <button
          type="button"
          role="switch"
          [attr.aria-checked]="value"
          [attr.dir]="'ltr'"
          [class]="'relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 border-0 ' + 
            (value ? 'bg-[#1AD9C7] focus:ring-[#1AD9C7]' : 'bg-[#dcdcdc] focus:ring-[#dcdcdc]') + 
            (disabled ? ' opacity-50 cursor-not-allowed' : ' cursor-pointer hover:shadow-md')"
          (click)="toggle()"
          [disabled]="disabled"
        >
          <span
            [class]="'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out border-0 ' + 
              (value ? 'translate-x-8 rtl:translate-x-[0.25rem]' : 'translate-x-1 rtl:translate-x-[1.9rem]') + 
              (disabled ? '' : ' hover:shadow-md')"
          >
            @if (value) {
              <svg class="h-3 w-3 text-[#1AD9C7] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            }
          </span>
        </button>
        @if (label) {
          <label class="text-sm font-medium text-gray-700">
            @if (required && requiredIndicatorPosition === 'before') {
              <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold me-1'">*</span>
            }
            {{ label | translate }}
            @if (required && requiredIndicatorPosition === 'after') {
              <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold ms-1'">*</span>
            }
          </label>
        }
      </div>
      @if (control && control.invalid && (control.touched || formSubmitted)) {
        <div class="text-sm text-red-600 mt-1">
          {{ errorMessage }}
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true
    }
  ]
})
export class ToggleSwitchComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';

  value = false;
  disabled = false;
  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  toggle(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && control.value === false) {
      return { required: true };
    }
    return null;
  }
} 