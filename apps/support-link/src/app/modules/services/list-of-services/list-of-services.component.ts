import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslationService } from '@support-link/translations';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { environment } from '../../../../environments/environment';
import { ServiceItemDto } from '../../home/models/our-services.model';
import { UtilityService } from '../../../shared/services/utility.service';
import { OurServicesService } from '../services/our-services.service';

interface ServiceCache {
  [key: number]: {
    data: ServiceItemDto[];
    timestamp: number;
  };
}

@Component({
  selector: 'app-list-of-services',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    TranslateModule
  ],
  templateUrl: './list-of-services.component.html',
  styleUrls: ['./list-of-services.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ListOfServicesComponent {

  currentLang = 'ar';
  services: ServiceItemDto[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 0;
  totalItems = 0;
  paginatedServices: ServiceItemDto[] = [];

  // Cache variables
  private servicesCache: ServiceCache = {};
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    public utilityService: UtilityService,
    private ourServicesService: OurServicesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
    
    this.loadEServices();
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
  private loadEServices(): void {
    if (this.isCacheValid(this.currentPage)) {
      const cachedData = this.servicesCache[this.currentPage];
      this.services = cachedData.data;
      this.paginatedServices = this.services;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.ourServicesService.getOurServices(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        //console.log(response);
        this.services = response.Items;
        this.totalItems = response.TotalItems;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedServices = this.services;

        // Cache the fetched data
        this.servicesCache[this.currentPage] = {
          data: this.services,
          timestamp: Date.now()
        };

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
    this.loadEServices();
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedNServices();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  navigateToServiceDetails(serviceItem: ServiceItemDto): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/', this.currentLang, 'services', this.currentLang === 'en' ? serviceItem.TitleEn : serviceItem.Title], {
      state: { id: serviceItem.Id }
    });
  }
} 