import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from '@support-link/shared/ui';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SharedModule } from '../../../shared/shared.module';
import { TranslationService } from '@support-link/translations';
import { UPDATE_PROFILE_CONFIG } from '../config/update-profile.config';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../dashboard-side-bar/dashboard-side-bar.component';
import { ProfileResponse } from '../models/profile.model';
import { DashboardService } from '../services/dashboard.service';
import { UPDATE_PROFILE_OTP_CONFIG } from '../config/update-profile-otp.config';
import { AuthService } from '@support-link/core/http';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
  ],
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  formConfig!: typeof UPDATE_PROFILE_CONFIG;
  otpFormConfig!: typeof UPDATE_PROFILE_OTP_CONFIG;
  currentLang = 'ar';
  returnUrl: string | null = null;
  loading = true;
  error = '';
  profile: ProfileResponse | null = null;
  otpFormVisible = false;

  constructor(
    public translationService: TranslationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit() {
    this.formConfig = UPDATE_PROFILE_CONFIG;
    this.otpFormConfig = UPDATE_PROFILE_OTP_CONFIG;

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.getUserProfile();
  }

  getUserProfile(): void {
    this.loading = true;
    this.dashboardService.getUserProfile().subscribe({
      next: (response) => {
        this.profile = response;

        if (this.formConfig && this.formConfig.fields) {
          this.formConfig.fields.forEach(field => {
            if (field.name.endsWith('Id')) {
              const baseName = field.name.replace(/Id$/, '');
              const nestedObj = (this.profile as any)[baseName];
              field.value = nestedObj?.Id ?? null;
            } else {
              field.value = (this.profile as any)[field.name] ?? null;
            }
          });
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again later.';
        this.loading = true;
        console.error('Error loading profile:', err);
      }
    });
  }

  onFormSubmitted(response: any) {
    console.log('Form submitted successfully:', response);
    this.otpFormConfig.fields.find(field => field.name === 'Email')!.value = response.Email;
    this.otpFormVisible = true;
  }

  onOtpFormSubmitted(response: any) {
    console.log('OTP form submitted:', response);
    if (response.Success) {
      this.router.navigate(['/', this.currentLang, 'profile']);
    } else {
      this.error = response.Message || 'OTP verification failed. Please try again.';
    }
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }

  onOtpFormError(error: any) {
    console.error('OTP form submission failed:', error);
  }
}