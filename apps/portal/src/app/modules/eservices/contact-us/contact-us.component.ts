import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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

  constructor(private fb: FormBuilder) {
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
      console.log(this.contactForm.value);
      // TODO: call API to submit form data
      this.formSubmitted = true;
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onClear() {
    this.contactForm.reset();
  }
}