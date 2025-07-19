import { Component, Input, forwardRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-select-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormsModule],
  template: `
    <div class="space-y-2 mb-6 relative">
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
      
      <div class="relative">
        <div
          (click)="toggleDropdown()"
          class="w-full px-4 py-3 text-gray-700 border border-gray-300 focus:outline-none focus:border-[#1AD9C7] focus:ring-1 focus:ring-[#1AD9C7] cursor-pointer flex justify-between items-center"
          [ngStyle]="{'font-family': 'inherit', 'border-radius': '0', 'border': '1px solid #d1d5db', 'padding': '0.75rem 1rem'}"
          [class.bg-gray-100]="disabled"
        >
          <span class="truncate">
            {{ selectedOption ? selectedOption.label : placeholder }}
          </span>
          <svg
            class="w-5 h-5 text-gray-400"
            [class.rotate-180]="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        @if (isOpen) {
          <div
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-auto"
            [ngStyle]="{'border-radius': '0'}"
          >
            <div class="sticky top-0 bg-white p-2 border-b border-gray-200">
              <input
                type="text"
                [(ngModel)]="searchText"
                (ngModelChange)="filterOptions()"
                [placeholder]="'GENERAL.SEARCH' | translate"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1AD9C7] focus:ring-1 focus:ring-[#1AD9C7]"
                [ngStyle]="{'font-family': 'inherit', 'border-radius': '0'}"
              >
            </div>
            
            @if (filteredOptions.length === 0) {
              <div class="px-4 py-2 text-gray-500 text-sm">
                {{ 'No options found' | translate }}
              </div>
            } @else {
              @for (option of filteredOptions; track option.value) {
                <div
                  (click)="selectOption(option)"
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  [class.bg-gray-100]="option.value === value"
                >
                  {{ option.label | translate }}
                </div>
              }
            }
          </div>
        }
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
      useExisting: forwardRef(() => SelectSearchComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectSearchComponent),
      multi: true
    }
  ]
})
export class SelectSearchComponent implements ControlValueAccessor, Validator {
  @Input() name!: string;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';
  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @Input() value: string | number | null = null;

  disabled = false;
  isOpen = false;
  searchText = '';
  filteredOptions: SelectOption[] = [];
  selectedOption: SelectOption | null = null;

  onChange: (value: string | number | null) => void = () => { };
  onTouched: () => void = () => { };

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.filterOptions();
      }
    }
  }

  filterOptions() {
    if (!this.searchText) {
      this.filteredOptions = [...this.options];
    } else {
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  selectOption(option: SelectOption) {
    this.value = option.value;
    this.selectedOption = option;
    this.onChange(this.value);
    this.onTouched();
    this.isOpen = false;
    this.searchText = '';
  }

  writeValue(value: string | number | null): void {
    this.value = value;
    this.selectedOption = this.options.find(opt => opt.value === value) || null;
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
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
    return null;
  }
}