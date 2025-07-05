import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'apps/support-link/src/environments/environment';
import { TranslationService } from '@support-link/translations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentLang = 'ar';
  loginForm: FormGroup;
  otpForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showOtpScreen = false;
  recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.recaptchaV3Service.execute('your_action_name').subscribe(
        (token) => {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.showOtpScreen = true;
          }, 1000);
        },
        (error) => {
          console.error('reCAPTCHA error:', error);
        });
    }
  }

  onOtpSubmit() {
    if (this.otpForm.invalid) {
      this.recaptchaV3Service.execute('your_action_name').subscribe(
        (token) => {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        (error) => {
          console.error('reCAPTCHA error:', error);
        });
    }
  }

  navigateToSignup() {
    this.router.navigate([`/${this.currentLang}/auth/signup`]);
  }

  navigateToPasswordReset() {
    this.router.navigate([`/${this.currentLang}/auth/password-reset`]);
  }
} 