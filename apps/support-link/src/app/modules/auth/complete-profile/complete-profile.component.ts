import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPLETE_PROFILE_CONFIG } from '../config/complete-profile.config';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from '@support-link/shared/ui';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  formConfig!: typeof COMPLETE_PROFILE_CONFIG;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.formConfig = COMPLETE_PROFILE_CONFIG;
    
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.formConfig.fields.find(field => field.name === 'Email')!.value = params['email'];
      }
    });
  }

  onFormSubmitted(response: any) {
    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }
}