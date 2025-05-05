import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslationService } from '@nimic/translations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';
import { Content } from '../models/content.model';

interface ContentCache {
  [route: string]: {
    data: Content;
    timestamp: number;
  }; 
}

@Component({
  selector: 'app-cms-data',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, TranslateModule, NgxSkeletonLoaderModule],
  templateUrl: './cms-data.component.html',
  styleUrls: ['./cms-data.component.scss']
})
export class CMSDataComponent implements OnInit {
  currentLang = 'ar';
  content: Content | undefined;
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;

  private contentCache: ContentCache = {};
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private contentService: ContentService) { }

  ngOnInit() {
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    const result = "CMS/" + parts.slice(1).join('/');
  
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.loadContent(result);
  }

  private isCacheValid(route: string): boolean {
    const cachedData = this.contentCache[route];
    if (!cachedData) return false;

    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }

  private loadContent(route: string): void {
    if (this.isCacheValid(route)) {
      const cachedData = this.contentCache[route];
      this.content = cachedData.data;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.contentService.getContent(route).subscribe({
      next: (response) => {
        this.content = response;
        this.content.Content = this.content.Content.replace(/src="\/CMS\/media/g, `src="${this.portalUrl}/media`);

        console.log(this.content.Content)

        // Cache the fetched data
        this.contentCache[route] = {
          data: this.content,
          timestamp: Date.now()
        };

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load content. Please try again later.';
        this.loading = false;
        console.error('Error loading content:', err);
      }
    });
  }
} 