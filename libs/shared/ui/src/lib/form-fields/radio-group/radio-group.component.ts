import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface RadioOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="space-y-2 mb-6" [ngStyle]="{'font-family': 'inherit'}">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700">{{ label | translate }}</label>
      <div class="flex gap-4" [ngStyle]="{'border': '1px solid #d1d5db', 'border-radius': '0', 'padding': '0.75rem 1rem'}">
        <div *ngFor="let option of options" class="flex items-center">
          <input
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="value === option.value"
            (change)="onChange(option.value)"
            class="w-4 h-4 text-[#1AD9C7] border-gray-300 focus:ring-[#1AD9C7]"
            [id]="option.label"
          >
          <label [for]="option.label" class="mr-2 text-sm font-medium text-gray-700">
            {{ option.label | translate }}
          </label>
        </div>
      </div>
      <div *ngIf="control && control.invalid && (control.touched || formSubmitted)" class="text-sm text-red-600">
        {{ errorMessage | translate }}
      </div>
    </div>
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

  value: number | null = null;
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: number): void {
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
    if (!control.value) {
      return { required: true };
    }
    return null;
  }
} 