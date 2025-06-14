import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chips-input',
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
      <div 
        class="w-full px-4 py-3 text-gray-700 border border-gray-300 focus-within:outline-none focus-within:border-[#1AD9C7] focus-within:ring-1 focus-within:ring-[#1AD9C7] min-h-[42px]"
        [ngStyle]="{'font-family': 'inherit', 'border-radius': '0', 'border': '1px solid #d1d5db', 'padding': '0.75rem 1rem'}"
        [class.bg-gray-50]="disabled"
        [class.cursor-not-allowed]="disabled"
        [class.opacity-50]="disabled">
        <div class="flex flex-wrap gap-2">
          @for (chip of value; track chip) {
            <div class="flex items-center gap-1.5 px-3 py-1.5 bg-[#e9e9e9]  text-[#1A1A1A] rounded-full">
              <span class="text-sm font-medium">{{ chip }}</span>
              <button 
                type="button" 
                (click)="removeChip(chip)"
                class="text-[#1A1A1A] bg-[#a4a4a4] opacity-60 hover:opacity-100 focus:outline-none transition-all duration-200 flex items-center justify-center rounded-full border-0 p-0.5 cursor-pointer"
                [disabled]="disabled">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          }
          <input
            type="text"
            [value]="inputValue"
            (input)="onInput($event)"
            (keydown.enter)="addChip($event)"
            (keydown)="onKeydown($event)"
            (blur)="onBlur()"
            [placeholder]="value.length === 0 ? placeholder : ''"
            [maxLength]="maxLength"
            [name]="name"
            class="flex-1 min-w-[120px] bg-transparent text-sm"
            [ngStyle]="{'font-family': 'inherit', 'border': '0'}"
            [disabled]="disabled"
            [class.cursor-not-allowed]="disabled"
          >
        </div>
      </div>
      @if (control && control.invalid && (control.touched || formSubmitted)) {
        <div class="text-sm text-red-600">
          {{ errorMessage }}
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsInputComponent),
      multi: true
    }
  ]
})
export class ChipsInputComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() maxLength = 200;
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';
  @Input() name = '';
  @Input() maxChips = 0; // 0 means unlimited
  @Input() allowDuplicates = false;

  value: string[] = [];
  inputValue = '';
  disabled = false;
  onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
    this.onTouched();
  }

  addChip(event: Event): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value && this.isValidChip(value)) {
      if (this.maxChips === 0 || this.value.length < this.maxChips) {
        this.value = [...this.value, value];
        this.onChange(this.value);
      }
      this.inputValue = '';
    }
  }

  removeChip(chip: string): void {
    this.value = this.value.filter(c => c !== chip);
    this.onChange(this.value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (input.value === '' && this.value.length > 0) {
        this.value = this.value.slice(0, -1);
        this.onChange(this.value);
      }
    }
  }

  onBlur(): void {
    const value = this.inputValue.trim();
    if (value && this.isValidChip(value)) {
      if (this.maxChips === 0 || this.value.length < this.maxChips) {
        this.value = [...this.value, value];
        this.onChange(this.value);
      }
      this.inputValue = '';
    }
    this.onTouched();
  }

  private isValidChip(value: string): boolean {
    if (!this.allowDuplicates && this.value.includes(value)) {
      return false;
    }
    return true;
  }

  writeValue(value: string[]): void {
    this.value = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && (!control.value || control.value.length === 0)) {
      return { required: true };
    }
    if (this.maxChips > 0 && control.value && control.value.length > this.maxChips) {
      return { maxChips: true };
    }
    return null;
  }
} 