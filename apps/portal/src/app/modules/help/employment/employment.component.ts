import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../../eservices/services/e-services.service';
import { ContactUs } from '../models/contact-us';
import { trigger, transition, style, animate } from '@angular/animations';
import { RadioGroupComponent, TextInputComponent, EmailInputComponent, TextareaComponent } from '@nimic/shared/ui';

@Component({
  selector: 'app-employment',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    RadioGroupComponent,
    TextInputComponent,
    EmailInputComponent,
    TextareaComponent
  ],
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EmploymentComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  successMessage = '';
  errorMessage = '';

  contactTypeOptions = [
    { value: 1, label: 'CONTACT_US.SUGGESTION' },
    { value: 2, label: 'CONTACT_US.COMPLAINT' }
  ];

  constructor(private fb: FormBuilder, private eServicesService: EServicesService) {
    this.contactForm = this.fb.group({
      contactType: [null],
      subject: [''],
      fullName: [''],
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.valid) {
      const formData: ContactUs = this.contactForm.value;
      this.eServicesService.submitContactUs(formData).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.contactForm.reset();
          this.formSubmitted = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.successMessage = '';
        }
      });
    }
  }

  onClear() {
    this.contactForm.reset();
    this.formSubmitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}