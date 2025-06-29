import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiDataService } from '@support-link/shared/utils';
import { environment } from '../../../../environments/environment';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContentService } from '../../content/services/content.service';
import { Content } from '../../content/models/content.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, NgxSkeletonLoaderModule, TranslateModule],
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
  content: Content | undefined;
  imageToDisplay: string | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiDataService: ApiDataService,
    private contentService: ContentService,
  ) { }

  ngOnInit(): void {
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    this.route.paramMap.subscribe(params => {
      const serviceTitle = history.state.title;
      this.loadServiceDetails("/CMS/" + parts.slice(1).join('/') + "/");
    });
  }

  private loadServiceDetails(serviceTitle: string): void {
    this.loading = true;
    this.apiDataService.getCmsData(serviceTitle).subscribe({
      next: (response) => {
        // this.content = response;
        // if (this.content?.Content) {
        //   this.content.Content = this.content.Content.replace(/src="\/CMS\/media/g, `src="${this.portalUrl}/media`);
        //   //  this.content.Content = this.content.Content.replace(/href="\/CMS/g, `href="${this.currentLang}`);
        // }

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