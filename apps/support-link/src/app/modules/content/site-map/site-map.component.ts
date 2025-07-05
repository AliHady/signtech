import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../shared/services/header.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from '@support-link/translations';
import { trigger, transition, style, animate } from '@angular/animations';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-site-map',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    TranslateModule,
    TranslationsModule
],
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SiteMapComponent implements OnInit {
  menuItems: MenuItem[] = [];
  loading = true;
  error = '';
  currentLang = 'ar';

  constructor(
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    const fullUrl = this.router.url.split('?')[0];
    const parts = fullUrl.split('/').filter(Boolean);
    const lang = parts[0];
    if (lang && (lang === 'en' || lang === 'ar')) {
      this.currentLang = lang;
    }

   // Subscribe to menu items from HeaderService to prevent multi calls :D
    this.headerService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error getting menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure navigation has started
  } 
} 