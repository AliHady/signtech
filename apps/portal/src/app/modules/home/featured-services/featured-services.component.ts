import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../content/services/content.service';
import { EServiceLink } from '../../eservices/models/eserviceslinks.model';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit {
  services: EServiceLink[] = [];
  loading = true;
  error = '';
  currentLang: string = 'en';

  constructor(
    private translate: TranslateService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    // Set default language if not set
    if (!this.translate.currentLang) {
      this.translate.use('en');
    }
    this.currentLang = this.translate.currentLang || 'en';
    this.loadFeaturedServices();
  }

  private loadFeaturedServices(): void {
    this.loading = true;
    // Fetch first page with 6 items for featured services
    this.contentService.getAllEservices(1, 6).subscribe({
      next: (response) => {
        // Filter services that should be shown in home
        this.services = response.Items.filter(service => service.ShowInHome);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load featured services. Please try again later.';
        this.loading = false;
        console.error('Error loading featured services:', err);
      }
    });
  }


  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure navigation has started
  }
} 