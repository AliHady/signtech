import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '@nimic/translations';
import { HeaderService } from '../../services/header.service';
import { NavMenu } from '../../models/navmen.model';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class BreadcrumbsComponent implements OnInit {
  list: BreadcrumbItem[] = [];
  currentLang = 'ar';
  currentPath = '';
  loading = true;
  error = '';
  isRTL = false;

  constructor(
    private router: Router,
    public translationService: TranslationService,
    public translate: TranslateService,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.isRTL = document.dir === 'rtl';
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    const lang = parts[0];
    if (lang && (lang === 'en' || lang === 'ar')) {
      this.currentLang = lang;
      this.currentPath = decodeURIComponent(fullUrl.replace('/' + lang, ''));
      this.translationService.setLanguage(lang);
      this.subscribeToMenuItems();
    }
  }

  private subscribeToMenuItems() {
    this.loading = true;
    this.error = '';
    this.headerService.getMenuItems().subscribe({
      next: (items) => {
        this.buildBreadcrumbs(items);
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error getting menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }

  buildBreadcrumbs(data: any[]) {
    this.list = [];

    this.list.push({
      url: '/home',
      label: this.translate.instant('GENERAL.HOME')
    });

    const isPathFound = this.findPath(data);
    if (!isPathFound) {
      const lastMatch = this.findNearestMatch(data, this.currentPath);
      if (lastMatch && !this.list.some(x => x.url === lastMatch.url)) {
        this.list.push({
          url: lastMatch.url,
          label: lastMatch.title
        });
      }
    }

    const lastBreadcrumbUrl = this.list[this.list.length - 1]?.url;
    const currentSegments = this.currentPath.split('/').filter(x => x);
    const translationPrefix = currentSegments.length > 0 ? currentSegments[0].toUpperCase() : 'GENERAL';

    if (lastBreadcrumbUrl && this.currentPath.startsWith(lastBreadcrumbUrl)) {
      const remainingPath = this.currentPath.replace(lastBreadcrumbUrl.replace('/' + this.currentLang, ''), '');
      const remainingSegments = remainingPath.split('/').filter(x => x);

      if (remainingSegments.length) {
        let accumulatedPath = lastBreadcrumbUrl;

        for (const segment of remainingSegments) {
          accumulatedPath += '/' + segment;
          if (!this.list.some(x => x.url === accumulatedPath)) {
            if (translationPrefix !== 'MEDIACENTER') {
              this.list.push({
                url: accumulatedPath,
                label: this.translate.instant(translationPrefix + '.' + segment.toUpperCase())
              });
            }
            else {
              this.list.push({
                url: accumulatedPath,
                label: segment
              });
            }
          }
        }
      }
    }

    for (const breadcrumb of this.list) {
      breadcrumb.url = "/" + this.currentLang + breadcrumb.url;
    }
  }

  private findNearestMatch(nodes: any[], path: string): any {
    for (const node of nodes) {
      if (path.startsWith(node.url)) {
        return node;
      }
      if (node.children && node.children.length) {
        const result = this.findNearestMatch(node.children, path);
        if (result) return result;
      }
    }
    return null;
  }

  private findPath(nodes: any[]): boolean {
    for (const node of nodes) {
      if (this.currentPath.startsWith(node.url)) {
        this.list.push({
          url: node.url,
          label: node.title
        });

        if (node.url === this.currentPath) {
          return true;
        }
      }

      if (node.children && node.children.length) {
        if (this.findPath(node.children)) {
          return true;
        }
      }
    }

    return false;
  }
} 