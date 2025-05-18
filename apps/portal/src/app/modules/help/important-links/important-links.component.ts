import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TranslationService } from '@nimic/translations';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { News } from '../../content/models/news.model';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { ContentService } from '../../content/services/content.service';
import { environment } from '../../../../environments/environment';
import { EServiceLink } from '../../eservices/models/eserviceslinks.model';
import { FooterService } from '../../../shared/services/footer.service';
import { ImportantLink } from '../../../shared/models/importantlinks.model';

interface EServiceCache { 
  [key: number]: {
    data: EServiceLink[];
    timestamp: number;
  };
}


@Component({
  selector: 'app-important-links',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './important-links.component.html',
  styleUrls: ['./important-links.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ImportantLinksComponent {

  currentLang = 'ar';
  services: ImportantLink[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 0; 
  totalItems = 0;
  paginatedServices: ImportantLink[] = [];

  // Cache variables
  private servicesCache: EServiceCache = {};
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private translateService: TranslateService,
    private contentService: ContentService,
    private footerService: FooterService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
    this.loadImportantLinks();
  }
  getRoute(route: string): string {
    return `/${this.currentLang}${route}`; 
  }

  private isCacheValid(page: number): boolean {
    const cachedData = this.servicesCache[page];
    if (!cachedData) return false;
    
    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }
  private loadImportantLinks(): void {
    this.loading = true;
    this.footerService.getImportantLinks().subscribe({
      next: (response) => {
        this.services = response.Items;
        this.paginatedServices = this.services;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load services. Please try again later.';
        this.loading = false;
        console.error('Error loading services:', err);
      }
    });
  }
  updatePaginatedNServices(): void {
    this.loadImportantLinks();
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedNServices();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getServicePath(link: string): string {
    const parts = link.split('/').filter(part => part);
    return parts[parts.length - 1];
  }

  navigateToServiceDetails(serviceItem: ImportantLink): void { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
 
    if (serviceItem.Link.startsWith('http://') || serviceItem.Link.startsWith('https://')) {
      window.open(serviceItem.Link, '_blank');
      return;
    }
    
    const servicePath = this.getServicePath(serviceItem.Link);
    this.router.navigate(['/' ,this.currentLang,'eservices', servicePath], {
      state: { id: serviceItem.Title }
    });
  } 
 } 

 // this.router.navigate(['/' ,this.currentLang,'mediacenter', 'news', newsItem.Title], {