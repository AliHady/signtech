import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@support-link/translations';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../dashboard-side-bar/dashboard-side-bar.component';
import { AuthService } from '@support-link/core/http';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgxChartsModule,
    NgxTypedJsModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  userName: string = '';
  currentLang = 'ar';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    public translationService: TranslationService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userName = this.authService.getFullName();
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  changeLang(lang: string) {
    this.translationService.setLanguage(lang);
    setTimeout(() => {
      const currentUrl = this.router.url;
      const newUrl = currentUrl.replace(/^\/[a-z]{2}/, `/${lang}`);
      this.router.navigateByUrl(newUrl);
    }, 100);
  }

  goToProfile() {
    this.router.navigate(['/', this.translate.currentLang, 'profile']);
  }
} 