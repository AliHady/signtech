import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPLETE_PROFILE_CONFIG } from '../config/complete-profile.config';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from '@signtech/shared/ui';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SharedModule } from '../../../shared/shared.module';
import { TranslationService } from '@signtech/translations';
import { AuthService } from '@signtech/core/http';

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
  currentLang = 'ar';
  returnUrl: string | null = null;

  constructor(
    public translationService: TranslationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  ngOnInit() {
    this.formConfig = COMPLETE_PROFILE_CONFIG;

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.formConfig.fields.find(field => field.name === 'Email')!.value = params['email'];
      }
    });
  }

  onFormSubmitted(response: any) {
    if (response && response.token) {
      this.authService.setLoggedIn(true);
      let url = this.returnUrl || '/dashboard';
      url = decodeURIComponent(url);
      if (!url.startsWith('/')) url = '/' + url;
      this.router.navigate([`/${this.currentLang}${url}`]);
    }

    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }
}