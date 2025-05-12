import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../services/e-services.service';
import { ContactUs } from '../models/contact-us';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactUsComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private eServicesService: EServicesService) {
    this.contactForm = this.fb.group({
      contactType: [null, Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(200)]],
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
      message: ['', [Validators.required, Validators.maxLength(400)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData: ContactUs = this.contactForm.value;
      this.eServicesService.submitContactUs(formData).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.contactForm.reset();
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
  }
}