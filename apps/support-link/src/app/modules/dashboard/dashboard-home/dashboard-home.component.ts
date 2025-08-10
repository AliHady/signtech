import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { TranslationService } from '@support-link/translations';
import { PeriodStatisticsDto } from '../models/period-statistics.model';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule, DashboardSideBarComponent, DashboardHeaderComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  currentLang = 'ar';
  loading = true;
  statistics: PeriodStatisticsDto | null = null;
  error = '';

  constructor(
    private translationService: TranslationService,
    private requestService: RequestService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnInit() {
    this.getPeriodStatistics();
  }

  getPeriodStatistics(): void {
    this.loading = true;
    this.requestService.getPeriodStatistics().subscribe({
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