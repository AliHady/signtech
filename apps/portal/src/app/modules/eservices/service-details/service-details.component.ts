import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, NgxSkeletonLoaderModule],
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
  serviceDetails: any;
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cmsDataService: CmsDataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceTitle = history.state.title;
      if (serviceTitle) {
        this.loadServiceDetails(serviceTitle);
      } else {
        this.error = 'Service title not found';
        this.loading = false;
      }
    });
  }

  private loadServiceDetails(serviceTitle: string): void {
    const endpoint = `${environment.contentUrl}/services/details/${encodeURIComponent(serviceTitle)}`;
    this.cmsDataService.getCmsPaginatedData(endpoint).subscribe({
      next: (response) => {
        this.serviceDetails = response;
        console.log(response);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load service details. Please try again later.';
        this.loading = false;
        console.error('Error loading service details:', err);
      }
    });
  }
} 