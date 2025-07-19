import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@support-link/translations';

@Component({
  selector: 'dashboard-side-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule],
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.scss']
})
export class DashboardSideBarComponent {
  @Input() active: string = 'DASHBOARD';
  currentLang = 'ar';

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
} 