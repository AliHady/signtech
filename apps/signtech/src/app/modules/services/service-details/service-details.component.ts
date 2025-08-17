import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { environment } from '../../../../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';
import { OurServicesService } from '../services/our-services.service';
import { ServiceItemDto } from '../../home/models/our-services.model';
import { UtilityService } from '../../../shared/services/utility.service';
import { TranslationService } from '@signtech/translations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    TranslateModule],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ServiceDetailsComponent implements OnInit {
  showPopup = false;
  currentLang = 'ar';
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  serviceDetails: ServiceItemDto | undefined;
  imageToDisplay: string | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public utilityService: UtilityService,
    public translationService: TranslationService,
    private ourServicesService: OurServicesService,
    private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.route.paramMap.subscribe(params => {
      const serviceId = history.state.id;
      if (serviceId) {
        this.loadServiceDetails(serviceId);
      } else {
        this.error = 'Event ID not found';
        this.loading = false;
      }
    });

    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    this.route.paramMap.subscribe(params => {
      const serviceTitle = history.state.title;
    });
  }

  private loadServiceDetails(serviceId: number): void {
    this.loading = true;
    this.ourServicesService.getServiceDetails(serviceId).subscribe({
      next: (response) => {
        this.serviceDetails = response;
        this.imageToDisplay = this.utilityService.getImageSrc(this.serviceDetails.Image);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load content. Please try again later.';
        this.loading = false;
        console.error('Error loading content:', err);
      }
    });
  }

  openRequestSupport(serviceId: number) {
    this.showPopup = true;
  }

  requestSupport() {
    this.showPopup = false;
    this.router.navigate(['/', this.currentLang, 'auth', 'login']);
  }

  goBack() {
    this.location.back();
  }
}