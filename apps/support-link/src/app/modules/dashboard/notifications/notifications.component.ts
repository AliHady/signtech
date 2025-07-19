import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@support-link/translations';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../dashboard-side-bar/dashboard-side-bar.component';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgxChartsModule,
    NgxTypedJsModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  userName: string = 'Adel';
  currentLang = 'ar';

  constructor(
    public translationService: TranslationService,
    private route: ActivatedRoute) {
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
} 