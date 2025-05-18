import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EServicesService } from '../services/e-services.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TextInputComponent } from '@nimic/shared/ui';
import { EmailInputComponent } from '@nimic/shared/ui';
import { FileUploadComponent } from '@nimic/shared/ui';

@Component({
  selector: 'app-senai',
  standalone: true,
  imports: [
    CommonModule, 
    SharedModule, 
    TranslateModule, 
    ReactiveFormsModule,
    TextInputComponent,
    EmailInputComponent,
    FileUploadComponent
  ],
  templateUrl: './senai.component.html',
  styleUrls: ['./senai.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SenaiComponent {
  applyForm: FormGroup;
  formSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private eServicesService: EServicesService) {
    this.applyForm = this.fb.group({
      organizationName: ['', [Validators.required, Validators.maxLength(200)]],
      communicationSupervisorName: ['', [Validators.required, Validators.maxLength(200)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
      crFile: [null, Validators.required],
      taxFile: [null, Validators.required],
      gosiFile: [null, Validators.required],
      financialStatementsFile: [null, Validators.required],
      investmentLicenseFile: [null, Validators.required],
      chamberOfCommerceCertificateFile: [null, Validators.required],
      businessClassificationCertificateFile: [null, Validators.required],
      certificateToTheSaudiCouncilOfEngineersFile: [null, Validators.required],
      certificateOfAchievingTheRegularPercentageFile: [null, Validators.required],
      certificateOfExperienceFile: [null, Validators.required],
      priceOffer: [null, Validators.required]
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.applyForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.applyForm.valid) {
      const formData: any = this.applyForm.value;
      this.eServicesService.submitApplyToTarmeez(formData).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.applyForm.reset();
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
    this.applyForm.reset();
    this.formSubmitted = false;
  }
}