import { Component, Input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="space-y-2 mb-6" [ngStyle]="{'font-family': 'inherit'}">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700">
        <ng-container *ngIf="required && requiredIndicatorPosition === 'before'">
          <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold me-1'">*</span>
        </ng-container>
        {{ label | translate }}
        <ng-container *ngIf="required && requiredIndicatorPosition === 'after'">
          <span [class]="requiredIndicatorColor + ' ' + requiredIndicatorSize + ' font-bold ms-1'">*</span>
        </ng-container>
      </label>
      
      <!-- File Upload Area -->
      <div 
        class="relative border-2 border-dashed border-gray-300 p-6"
        [class.border-[#1AD9C7]]="isDragging"
        [class.bg-gray-50]="isDragging"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <!-- Upload Icon and Text -->
        <div class="text-center flex flex-col items-center justify-center" *ngIf="!file">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="mt-4 flex text-sm text-gray-600 items-center justify-center">
            <label class="relative cursor-pointer bg-white  font-medium text-[#1AD9C7] hover:text-[#1AD9C7]/80 focus-within:outline-none">
              <span class="me-2">{{ 'GENERAL.UPLOAD-FILE' | translate }}</span>
              <input 
                #fileInput
                type="file"
                class="sr-only"
                [accept]="acceptedFileTypes"
                (change)="onFileSelected($event)"
                [disabled]="disabled"
              >
            </label>
            <p class="pl-1">{{ 'GENERAL.OR-DRAG-DROP' | translate }}</p>
          </div>
          <p class="text-xs text-gray-500 mt-2 text-center">
            {{ 'GENERAL.FILE-TYPES' | translate }}
          </p>
        </div>

        <!-- File Preview -->
        <div *ngIf="file" class="flex flex-col items-center justify-center">
          <div class="relative w-full max-w-md">
            <!-- Preview Container -->
            <div class="relative  overflow-hidden bg-gray-50 p-4">
              <!-- Image Preview -->
              <div *ngIf="isImage" class="relative">
                <img [src]="previewUrl" 
                     [alt]="file.name" 
                     class="w-full h-48 object-contain ">
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200"></div>
              </div>
              
              <!-- Document Preview -->
              <div *ngIf="!isImage" class="flex flex-col items-center justify-center p-6">
                <svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p class="mt-2 text-sm font-medium text-gray-900">{{ file.name }}</p>
              </div>
            </div>

            <!-- File Info and Remove Button -->
            <div class="mt-4 flex flex-col bg-white  p-3 border border-gray-200">
              <div class="space-y-2 w-full">
                <div class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</div>
                <div class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</div>
                <div class="text-xs text-gray-400">{{ file.type }}</div>
              </div>
              <button 
                type="button"
                class="mt-3 w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 font-['DiodrumArabic']"
                (click)="removeFile()"
                [disabled]="disabled"
              >
                <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ 'GENERAL.REMOVE' | translate }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="control && control.invalid && (control.touched || formSubmitted)" class="text-sm text-red-600 text-center">
        {{ errorMessage | translate }}
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() control: AbstractControl | null = null;
  @Input() formSubmitted = false;
  @Input() acceptedFileTypes = 'image/*,.pdf';
  @Input() maxFileSize = 10 * 1024 * 1024; // 10MB default
  @Input() required = false;
  @Input() requiredIndicatorColor = 'text-red-500';
  @Input() requiredIndicatorSize = 'text-sm';
  @Input() requiredIndicatorPosition: 'before' | 'after' = 'after';

  file: File | null = null;
  previewUrl: string | null = null;
  isDragging = false;
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get isImage(): boolean {
    return this.file?.type.startsWith('image/') ?? false;
  }

  writeValue(value: File | null): void {
    this.file = value;
    if (value) {
      this.createPreview();
    } else {
      this.previewUrl = null;
    }
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
    if (this.required && !control.value) {
      return { required: true };
    }
    return null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    this.errorMessage = ''; // Clear any previous error messages
    if (this.validateFile(file)) {
      this.file = file;
      this.createPreview();
      this.onChange(this.file);
      this.onTouched();
    } else {
      this.file = null;
      this.previewUrl = null;
      this.onChange(null);
      this.onTouched();
    }
  }

  private validateFile(file: File): boolean {
    // Check file size
    if (file.size > this.maxFileSize) {
      this.errorMessage = 'GENERAL.FILE-SIZE-ERROR';
      return false;
    }

    // Check file type
    const acceptedTypes = this.acceptedFileTypes.split(',').map(type => type.trim());
    const fileType = file.type.toLowerCase();
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        const mimeType = type.replace('/*', '');
        return fileType.startsWith(mimeType);
      }
      return fileType === type || fileExtension === type;
    });

    if (!isValidType) {
      this.errorMessage = 'GENERAL.FILE-TYPE-ERROR';
      return false;
    }

    return true;
  }

  private createPreview(): void {
    if (this.file && this.isImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.onerror = () => {
        this.previewUrl = null;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.previewUrl = null;
    }
  }

  removeFile(): void {
    this.file = null;
    this.previewUrl = null;
    this.errorMessage = '';
    this.onChange(null);
    this.onTouched();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} 