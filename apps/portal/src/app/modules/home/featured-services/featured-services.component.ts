import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../content/services/content.service';
import { EServiceLink } from '../../eservices/models/eserviceslinks.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit, OnDestroy {
  services: EServiceLink[] = [];
  loading = true;
  error = '';
  currentLang: string = 'en';
  private langSubscription: Subscription;

  constructor(private translate: TranslateService, private contentService: ContentService) {
    this.currentLang = this.translate.currentLang || 'en';
    this.langSubscription = this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
    });
  }

  ngOnInit() {
    this.loadFeaturedServices();
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  private loadFeaturedServices(): void {
    this.loading = true;
    this.contentService.getAllEservices(1, 6, true).subscribe({
      next: (response) => {
        this.services = response.Items;
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
    }, 100);
  }
} 