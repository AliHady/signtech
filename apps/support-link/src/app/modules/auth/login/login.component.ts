import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'apps/support-link/src/environments/environment';
import { TranslationService } from '@support-link/translations';
import { AuthService, TokenService } from '@support-link/core/http';

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
  showOtpScreen = false;
  recaptchaSiteKey = environment.recaptchaSiteKey;
  returnUrl: string | null = null;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
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

  /**
   * Handles login form submission.
   * Executes reCAPTCHA and calls requestOtp API.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.recaptchaV3Service.execute('login').subscribe({
        next: (token) => {
          this.email = this.loginForm.value.email;
          this.authService.requestOtp(this.email, token).subscribe({
            next: () => {
              this.isLoading = false;
              this.showOtpScreen = true;
            },
            error: (error) => {
              this.isLoading = false;
              // Handle error (show message, etc.)
              console.error('Failed to request OTP:', error);
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('reCAPTCHA error:', error);
        }
      });
    }
  }

  /**
   * Handles OTP form submission.
   * Executes reCAPTCHA and calls verifyOtp API.
   */
  onOtpSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.recaptchaV3Service.execute('verify_otp').subscribe({
        next: (token) => {
          const email = this.loginForm.value.email;
          const otp = this.otpForm.value.otp;
          this.authService.verifyOtp(email, otp, token).subscribe({
            next: (response) => {
              this.tokenService.setToken(response.token);
              this.isLoading = false;
              if (response && !response.token) {
                this.router.navigate([`/${this.currentLang}/auth/complete-profile`], { queryParams: { email: this.email } });
              } else if (response && response.token) {
                this.authService.setLoggedIn(true);
                let url = this.returnUrl || '/dashboard';
                url = decodeURIComponent(url);
                if (!url.startsWith('/')) url = '/' + url;

                // Only add lang if not already present
                const langRegex = /^\/(en|ar)(\/|$)/;
                if (!langRegex.test(url)) {
                  url = `/${this.currentLang}${url}`;
                }
                this.router.navigate([url]);
              }
            },
            error: (error) => {
              this.isLoading = false;
              // Handle error (show message, etc.)
              console.error('OTP verification failed:', error);
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('reCAPTCHA error:', error);
        }
      });
    }
  }

  // navigateToSignup() {
  //   this.router.navigate([`/${this.currentLang}/auth/signup`]);
  // }

  // navigateToPasswordReset() {
  //   this.router.navigate([`/${this.currentLang}/auth/password-reset`]);
  // }
} 