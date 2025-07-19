import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@support-link/translations';

@Component({
  selector: 'dashboard-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
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