import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@support-link/translations';
import { DashboardStatisticsDto } from '../models/dashboard-statistics.model';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'dashboard-side-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule],
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.scss']
})
export class DashboardSideBarComponent implements OnInit {
  @Input() active: string = 'DASHBOARD';
  currentLang = 'ar';
  loading = true;
  statistics: DashboardStatisticsDto | null = null;
  error = '';

  constructor(
    private translationService: TranslationService,
    private requestService: RequestService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnInit() {
    this.getDashboardStatistics();
  }

  getDashboardStatistics(): void {
    this.loading = true;
    this.requestService.getDashboardStatistics().subscribe({
      next: (response) => {
        this.statistics = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load statistics. Please try again later.';
        this.loading = false;
        console.error('Error loading statistics:', err);
      }
    });
  }
} 