import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
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
export class EventDetailsComponent implements OnInit {
  @Input() eventItem: any;
  eventDetails: any;
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
      const eventId = history.state.id;
      if (eventId) {
        this.loadEventDetails(eventId);
      } else {
        this.error = 'Event ID not found';
        this.loading = false;
      }
    });
  }

  private loadEventDetails(eventId: number): void {
    const endpoint = `${environment.contentUrl}/events/details/${eventId}`;
    this.cmsDataService.getCmsPaginatedData(endpoint).subscribe({
      next: (response) => {
        this.eventDetails = response;
       // console.log(response);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load event details. Please try again later.';
        this.loading = false;
        console.error('Error loading event details:', err);
      }
    });
  }
} 