import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface RadioOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="space-y-2 mb-6" [ngStyle]="{'font-family': 'inherit'}">
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
      <div class="flex flex-col md:flex-row md:flex-wrap gap-4" [ngStyle]="{'border': '1px solid #d1d5db', 'border-radius': '0', 'padding': '0.75rem 1rem'}">
        @for (option of options; track option.value) {
          <div class="flex items-center">
            <label class="custom-radio-label">
              <input
                type="radio"
                [name]="name"
                [value]="option.value"
                [checked]="value === option.value"
                (change)="onChange(option.value)"
                class="custom-radio-input"
                [id]="option.label"
              >
              <span class="custom-radio"></span>
              <span class="ml-2 text-sm font-medium text-gray-700">
                {{ option.label | translate }}
              </span>
            </label>
          </div>
        }
      </div>
      @if (control && control.invalid && (control.touched || formSubmitted)) {
        <div class="text-sm text-red-600">
          {{ errorMessage }}
        </div>
      }
    </div>
    <style>
      .custom-radio-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
      }
      .custom-radio-input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .custom-radio {
        height: 16px;
        width: 16px;
        border: 2px solid #fff;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 0 2px #1AD9C7;
        transition: box-shadow 0.2s;
        display: inline-block;
        position: relative;
        margin-right: 0;
        margin-left: 8px;
      }
      .custom-radio-label .custom-radio-input:checked ~ .custom-radio {
        background: #1AD9C7;
        box-shadow: 0 0 0 2px #1AD9C7;
      }
      .custom-radio-label .custom-radio-input:checked ~ .custom-radio::after {
        content: '';
        display: block;
        position: absolute;
        top: 3px;
        left: 3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
      }
      .custom-radio-label .custom-radio-input:focus ~ .custom-radio {
        box-shadow: 0 0 0 4px #1AD9C755;
      }
    </style>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() options: RadioOption[] = [];
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() name = '';
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';
  @Input() value: string | null = null;

  disabled = false;
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && control.value === null) {
      return { required: true };
    }
    return null;
  }
}