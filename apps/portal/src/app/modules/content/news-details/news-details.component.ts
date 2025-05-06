import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { CmsDataService } from '@nimic/shared/utils';
import { environment } from '../../../../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
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
export class NewsDetailsComponent implements OnInit {
  @Input() newsItem: any;
  newsDetails: any;
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
      const newsId = history.state.id;
      if (newsId) {
        this.loadNewsDetails(newsId);
      } else {
        this.error = 'News ID not found';
        this.loading = false;
      }
    });
  }

  private loadNewsDetails(newsId: number): void {
    const endpoint = `${environment.contentUrl}/news/details/${newsId}`;
    this.cmsDataService.getCmsPaginatedData(endpoint).subscribe({
      next: (response) => {
        this.newsDetails = response;
       // console.log(response);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load news details. Please try again later.';
        this.loading = false;
        console.error('Error loading news details:', err);
      }
    });
  }
} 