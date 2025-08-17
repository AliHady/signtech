import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslationService } from '@signtech/translations';
import { AuthService } from '@signtech/core/http';
import { DashboardService } from '../services/dashboard.service';
import { ProfileResponse } from '../models/profile.model';

@Component({
  selector: 'dashboard-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
  userName: string = '';
  currentLang = 'ar';
  loading = true;
  error = '';
  profile: ProfileResponse | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    public translationService: TranslationService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService) {
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

    this.getUserProfile();
  }

  getUserProfile(): void {
    this.loading = true;
    this.dashboardService.getUserProfile().subscribe({
      next: (response) => {
        this.profile = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again later.';
        this.loading = false;
        console.error('Error loading profile:', err);
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/', this.currentLang, 'profile']);
  }
} 