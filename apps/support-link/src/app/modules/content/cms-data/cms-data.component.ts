import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslationService } from '@support-link/translations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';
import { Content } from '../models/content.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-cms-data',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, TranslateModule, NgxSkeletonLoaderModule],
  templateUrl: './cms-data.component.html',
  styleUrls: ['./cms-data.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CMSDataComponent implements OnInit {
  @ViewChild('contentContainer') contentContainer!: ElementRef;
  currentLang = 'ar';
  content: Content | undefined;
  loading = true;
  error = '';
  imageToDisplay: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    public translate: TranslateService,
    private contentService: ContentService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.loadContent("/CMS/" + parts.slice(1).join('/') + "/");
  }

  private loadContent(route: string): void {
    this.loading = true;
    this.contentService.getContent(route).subscribe({
      next: (response) => {
        this.content = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load content. Please try again later.';
        this.loading = false;
        console.error('Error loading content:', err);
      }
    });
  }

  ngAfterViewInit() {
  }

  displayImage(url: string) {
    this.imageToDisplay = url;
  }
}