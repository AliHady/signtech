import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslationService } from '@nimic/translations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ContentService } from '../services/content.service';
import { environment } from '../../../../environments/environment';
import { Content } from '../models/content.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

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
  portalUrl = environment.portalUrl;
  imageToDisplay: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    public translate: TranslateService,
    private contentService: ContentService) { }

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
        if (this.content?.Content) {
          this.content.Content = this.content.Content.replace(/src="\/CMS\/media/g, `src="${this.portalUrl}/media`);
          //  this.content.Content = this.content.Content.replace(/href="\/CMS/g, `href="${this.currentLang}`);
        }

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
    this.attachLinkHandlers();
  }

  attachLinkHandlers() {
    setTimeout(() => {
      const links: NodeListOf<HTMLAnchorElement> = this.contentContainer.nativeElement.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigate(href);
        });
      });
    }, 500);
  }

  navigate(url: string | null) {
    if (!url) return;

    const cleanUrl = url.split('#')[0];

    const isDocumentFile = /\.(pdf|docx?|xlsx?)$/i.test(cleanUrl);
    const isImageFile = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(cleanUrl);

    if (cleanUrl.startsWith('http')) {
      const fullUrl = cleanUrl;
      window.open(fullUrl, '_blank');
    } else if (isDocumentFile) {
      const fullUrl = this.portalUrl + cleanUrl.replace('/CMS', '');
      window.open(fullUrl, '_blank');
    } else if (isImageFile) {
      const fullImageUrl = this.portalUrl + cleanUrl.replace('/CMS', '');
      this.displayImage(fullImageUrl);
    } else {
      const route = cleanUrl.replace('CMS', this.currentLang);
      this.router.navigate([route]);
    }
  }

  displayImage(url: string) {
    this.imageToDisplay = url;
  }
}