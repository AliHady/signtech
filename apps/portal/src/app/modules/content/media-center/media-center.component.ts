import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from '@nimic/translations';
import { HeaderService } from '../../../shared/services/header.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-media-center',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    TranslateModule,
    TranslationsModule
  ],
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MediaCenterComponent implements OnInit {
  submenuItems: MenuItem[] = [];
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

    this.headerService.getMenuItems().subscribe({
      next: (items) => {
        const mediaCenterMenu = items.find(item => item.id === 1143);
        if (mediaCenterMenu && mediaCenterMenu.children) {
          this.submenuItems = mediaCenterMenu.children;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error getting menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }
} 