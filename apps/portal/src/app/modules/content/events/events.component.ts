import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { EventItem } from '../models/events.model';
import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';

interface EventsCache{
  [key: number]: {
    data: EventItem[];
    timestamp: number;
  };
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, TranslateModule, NgxSkeletonLoaderModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class EventsComponent implements OnInit {
  currentLang = 'ar';
  event: EventItem[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 0; 
  totalItems = 0;
  paginatedEvents: EventItem[] = [];

  // Cache variables
  private eventsCache: EventsCache = {};
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
    this.loadEvents();
  }

  getRoute(route: string): string {
    return `/${this.currentLang}${route}`; 
  }

  private isCacheValid(page: number): boolean {
    const cachedData = this.eventsCache[page];
    if (!cachedData) return false;
    
    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }

  private loadEvents(): void {
    if (this.isCacheValid(this.currentPage)) {
      const cachedData = this.eventsCache[this.currentPage];
      this.event = cachedData.data;
      this.paginatedEvents = this.event;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.contentService.getAllEvents(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.event = response.Items;
        this.totalItems = response.TotalItems;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedEvents = this.event;
        
        // Cache the fetched data
        this.eventsCache[this.currentPage] = {
          data: this.event,
          timestamp: Date.now()
        };
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load Events. Please try again later.';
        this.loading = false;
        console.error('Error loading Events:', err);
      }
    });
  }

  updatePaginatedEvents(): void {
    this.loadEvents();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
 
  navigateToEventsDetails(eventItem: EventItem): void { 
    this.router.navigate(['/' ,this.currentLang,'mediacenter', 'events', eventItem.Title], {
  
    });
  }
} 