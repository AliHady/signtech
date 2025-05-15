import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface CheckboxOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="space-y-2 mb-6" [ngStyle]="{'font-family': 'inherit'}">
      @if (label) {
        <label class="block text-sm font-medium text-gray-700">{{ label | translate }}</label>
      }
      <div class="flex flex-col gap-2" [ngStyle]="{'border': '1px solid #d1d5db', 'border-radius': '0', 'padding': '0.75rem 1rem'}">
        @for (option of options; track option.value) {
          <div class="flex items-center">
            <label class="custom-checkbox-label">
              <input
                type="checkbox"
                [name]="name"
                [value]="option.value"
                [checked]="isChecked(option.value)"
                (change)="onCheckboxChange(option.value, $event)"
                class="custom-checkbox-input"
                [id]="option.label"
              >
              <span class="custom-checkbox"></span>
              <span class="ml-2 text-sm font-medium text-gray-700">
                {{ option.label | translate }}
              </span>
            </label>
          </div>
        }
      </div>
      @if (control && control.invalid && (control.touched || formSubmitted)) {
        <div class="text-sm text-red-600">
          {{ errorMessage | translate }}
        </div>
      }
    </div>
    <style>
      .custom-checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
      }
      .custom-checkbox-input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .custom-checkbox {
        height: 16px;
        width: 16px;
        border: 2px solid #fff;
        border-radius: 2px;
        background: #fff;
        box-shadow: 0 0 0 2px #1AD9C7;
        transition: box-shadow 0.2s;
        display: inline-block;
        position: relative;
        margin-right: 0;
        margin-left: 8px;
      }
      .custom-checkbox-label .custom-checkbox-input:checked ~ .custom-checkbox {
        background: #1AD9C7;
        box-shadow: 0 0 0 2px #1AD9C7;
      }
      .custom-checkbox-label .custom-checkbox-input:checked ~ .custom-checkbox::after {
        content: '';
        display: block;
        position: absolute;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      .custom-checkbox-label .custom-checkbox-input:focus ~ .custom-checkbox {
        box-shadow: 0 0 0 4px #1AD9C755;
      }
    </style>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() options: CheckboxOption[] = [];
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() name = '';

  value: number[] = [];
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: number[]): void {
    this.value = value || [];
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
    if (!control.value || control.value.length === 0) {
      return { required: true };
    }
    return null;
  }

  isChecked(optionValue: number): boolean {
    return this.value.includes(optionValue);
  }

  onCheckboxChange(optionValue: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.value = [...this.value, optionValue];
    } else {
      this.value = this.value.filter(v => v !== optionValue);
    }
    this.onChange(this.value);
    this.onTouched();
  }
} 