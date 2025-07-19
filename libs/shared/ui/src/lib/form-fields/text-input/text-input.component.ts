import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputRestriction } from '../../enums/input-restriction.enum';

@Component({
  selector: 'app-text-input',
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
        [type]="type"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [placeholder]="placeholder"
        [attr.maxlength]="maxLength"
        [name]="name"
        class="w-full px-4 py-3 text-gray-700 border border-gray-300 focus:outline-none focus:border-[#1AD9C7] focus:ring-1 focus:ring-[#1AD9C7]"
        [ngStyle]="{'font-family': 'inherit', 'border-radius': '0', 'border': '1px solid #d1d5db', 'padding': '0.75rem 1rem'}"
        [disabled]="disabled"
        [attr.pattern]="getPattern(inputRestriction)"
        [attr.inputmode]="getInputMode(inputRestriction)"
        (keypress)="onKeyPress($event)"
      >
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
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, Validator {
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
  @Input() inputRestriction: InputRestriction | undefined;
  @Input() type: string = 'text';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  disabled = false;
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.valueChange.emit(this.value);
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
    if (this.required && !control.value) {
      return { required: true };
    }
    if (this.maxLength && control.value && control.value.length > this.maxLength) {
      return { maxlength: true };
    }
    return null;
  }

  getPattern(restriction: InputRestriction | undefined): string | null {
    switch (restriction) {
      case InputRestriction.Numbers: return '[0-9]*';
      case InputRestriction.English: return '[A-Za-z0-9 ]*';
      case InputRestriction.Arabic: return '[\u0600-\u06FF ]*';
      default: return null;
    }
  }

  getInputMode(restriction: InputRestriction | undefined): string | null {
    if (restriction === InputRestriction.Numbers) return 'numeric';
    return null;
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.inputRestriction === InputRestriction.Numbers && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    if (this.inputRestriction === InputRestriction.English && !/[A-Za-z0-9 ]/.test(event.key)) {
      event.preventDefault();
    }
    if (this.inputRestriction === InputRestriction.Arabic && !/[\u0600-\u06FF ]/.test(event.key)) {
      event.preventDefault();
    }
  }
} 