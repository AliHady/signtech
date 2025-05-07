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
import { NavMenu } from '../../../shared/models/navmen.model';
import { HeaderService } from '../../../shared/services/header.service';
import { TranslateService } from '@ngx-translate/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

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
  currentPath = '';
  breadcrumbItem: BreadcrumbItem[] = [];
  imageToDisplay: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    public translate: TranslateService,
    private contentService: ContentService,
    private headerService: HeaderService) { }

  ngOnInit() {
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    this.currentPath = "/CMS/" + parts.slice(1).join('/') + "/";

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
        this.fetchMenuItems();
      }
    });

    this.loadContent(this.currentPath);
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

  private fetchMenuItems() {
    console.log('fetchMenuItems')
    this.loading = true;
    this.error = '';

    this.headerService.getNavigationMenu().subscribe({
      next: (response: NavMenu) => {
        this.buildBreadcrumbs(response);
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }

  buildBreadcrumbs(data: any[]) {
    this.breadcrumbItem = [];

    this.breadcrumbItem.push({
      url: "/" + this.currentLang + '/home',
      label: this.translate.instant('GENERAL.HOME')
    });

    const isPathFound = this.findPath(data);

    if (!isPathFound) {
      const lastMatch = this.findNearestMatch(data, this.currentPath);
      if (lastMatch && !this.breadcrumbItem.some(x => x.url === lastMatch.Url.replace('CMS', this.currentLang))) {
        this.breadcrumbItem.push({
          url: "/" + this.currentLang + lastMatch.Url.replace('CMS', ''),
          label: lastMatch.Text
        });
      }
    }

    const lastBreadcrumbUrl = this.breadcrumbItem[this.breadcrumbItem.length - 1]?.url;
    if (lastBreadcrumbUrl && this.currentPath.replace('CMS', this.currentLang).startsWith(lastBreadcrumbUrl)) {
      const extraPart = this.currentPath.replace('CMS', this.currentLang).replace(lastBreadcrumbUrl, '');
      if (extraPart) {
        const segment = extraPart.split('/').filter(x => x)[0];
        this.breadcrumbItem.push({
          url: "/" + this.currentLang + this.currentPath,
          label: this.translate.instant('PRODUCTS.' + segment.toUpperCase())
        });
      }
    }

    // this.breadcrumbItem.reverse();
  }

  private findNearestMatch(nodes: any[], path: string): any {
    for (const node of nodes) {
      if (path.startsWith(node.Url)) {
        return node;
      }
      if (node.Items && node.Items.length) {
        const result = this.findNearestMatch(node.Items, path);
        if (result) return result;
      }
    }
    return null;
  }

  // buildBreadcrumbs(data: any[]) {
  //   console.log('buildBreadcrumbs')
  //   this.breadcrumbItem = [];
  //   this.breadcrumbItem.push({ url: "/" + this.currentLang + '/home', label: this.translate.instant('GENERAL.HOME') });
  //   this.findPath(data);
  //   // this.breadcrumbItem.reverse();
  // }

  private findPath(nodes: any[]): boolean {
    for (const node of nodes) {
      if (this.currentPath.startsWith(node.Url)) {
        this.breadcrumbItem.push({
          url: "/" + this.currentLang + node.Url.replace('/CMS', ''),
          label: node.Text
        });

        if (node.url === this.currentPath) {
          return true;
        }
      }

      if (node.Items && node.Items.length) {
        if (this.findPath(node.Items)) {
          return true;
        }
      }
    }

    return false;
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
    }, 1000);
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