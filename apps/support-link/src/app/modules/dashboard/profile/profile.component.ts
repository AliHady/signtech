import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../dashboard-side-bar/dashboard-side-bar.component';
import { ProfileResponse } from '../models/profile.model';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '@support-link/translations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
    ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isLoading = false;
  currentLang = 'ar';
  loading = true;
  error = '';
  profile: ProfileResponse | null = null;

  constructor(
    public translationService: TranslationService,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router) {
  }

  ngOnInit() {
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

  goToUpdate() {
    this.router.navigate(['/', this.currentLang, 'profile', 'update']);
  }
} 