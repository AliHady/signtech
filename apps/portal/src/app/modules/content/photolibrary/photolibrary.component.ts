import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { News } from '../../home/models/news.model';
import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';

interface NewsCache {
  [key: number]: {
    data: News[];
    timestamp: number;
  };
}

@Component({
  selector: 'app-photolibrary',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, TranslateModule, NgxSkeletonLoaderModule],
  templateUrl: './photolibrary.component.html',
  styleUrls: ['./photolibrary.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PhotolibraryComponent implements OnInit {
  currentLang = 'en';
  news: News[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 0; 
  totalItems = 0;
  paginatedNews: News[] = [];

  // Cache variables
  private newsCache: NewsCache = {};
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private translateService: TranslateService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
    this.loadNews();
  }

  getRoute(route: string): string {
    return `/${this.currentLang}${route}`; 
  }

  private isCacheValid(page: number): boolean {
    const cachedData = this.newsCache[page];
    if (!cachedData) return false;
    
    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }

  private loadNews(): void {
    if (this.isCacheValid(this.currentPage)) {
      const cachedData = this.newsCache[this.currentPage];
      this.news = cachedData.data;
      this.paginatedNews = this.news;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.contentService.getAllNews(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.news = response.Items;
        this.totalItems = response.TotalItems;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedNews = this.news;
        
        // Cache the fetched data
        this.newsCache[this.currentPage] = {
          data: this.news,
          timestamp: Date.now()
        };
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load news. Please try again later.';
        this.loading = false;
        console.error('Error loading news:', err);
      }
    });
  }

  updatePaginatedNews(): void {
    this.loadNews();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  // <a [routerLink]="['/', currentLang, 'mediacenter', 'news']">News</a>
  navigateToNewsDetails(newsItem: News): void { 
    this.router.navigate(['/' ,this.currentLang,'mediacenter', 'news', newsItem.Title], {
      state: { id: newsItem.Id }
    });
  }
} 