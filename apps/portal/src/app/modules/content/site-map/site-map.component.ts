import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../shared/services/header.service';
import { NavMenu } from '../../../shared/models/navmen.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from '@nimic/translations';
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
    HeaderComponent, 
    FooterComponent,
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

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.fetchMenuItems();
  }

  private fetchMenuItems() {
    this.loading = true;
    this.error = '';
    
    this.headerService.getNavigationMenu().subscribe({
      next: (response: NavMenu) => {
        this.menuItems = response.map(item => ({
          id: item.Id,
          title: item.Text,
          url: item.Url,
          children: item.Items?.map(child => ({
            id: child.Id,
            title: child.Text,
            url: child.Url
          }))
        }));
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }
} 