import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';
import { VideoItem } from '../../home/models/video.model';

interface VideoCache {
  [key: number]: {
    data: VideoItem[];
    timestamp: number;
  };
}

@Component({
  selector: 'app-videolibrary',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, TranslateModule, NgxSkeletonLoaderModule],
  templateUrl: './videolibrary.component.html',
  styleUrls: ['./videolibrary.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class VideolibraryComponent implements OnInit {
  currentLang = 'en';
  video: VideoItem[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 0; 
  totalItems = 0;
  paginatedVideos: VideoItem[] = [];

  // Cache variables
  private videoCache: VideoCache = {};
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
    this.loadVideos();
  }

  getRoute(route: string): string {
    return `/${this.currentLang}${route}`; 
  }

  private isCacheValid(page: number): boolean {
    const cachedData = this.videoCache[page];
    if (!cachedData) return false;
    
    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }

  private loadVideos(): void {
    if (this.isCacheValid(this.currentPage)) {
      const cachedData = this.videoCache[this.currentPage];
      this.video = cachedData.data;
      this.paginatedVideos = this.video;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.contentService.getAllVideos(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.video = response.Items;
        this.totalItems = response.TotalItems;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedVideos = this.video;
        
        // Cache the fetched data
        this.videoCache[this.currentPage] = {
          data: this.video,
          timestamp: Date.now()
        };
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load videos. Please try again later.';
        this.loading = false;
        console.error('Error loading videos:', err);
      }
    });
  }

  updatePaginatedVideos(): void {
    this.loadVideos();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedVideos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  // <a [routerLink]="['/', currentLang, 'mediacenter', 'news']">News</a>
  navigateToNewsDetails(newsItem: VideoItem): void { 
    this.router.navigate(['/' ,this.currentLang,'mediacenter', 'news', newsItem.Title], {
     
    });
  }
} 