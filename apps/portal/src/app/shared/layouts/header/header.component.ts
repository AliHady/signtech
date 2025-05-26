import { Component, OnInit } from '@angular/core';
import { TranslationService, TranslationsModule } from '@nimic/translations';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { NavMenu } from '../../models/navmen.model';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslationsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentLang = 'ar';
  isMobileMenuOpen = false;
  menuItems: MenuItem[] = [];
  loading = true;
  error = '';
  mobileSubmenuOpen: { [key: string]: boolean } = {
    about: false,
    initiatives: false,
    products: false,
    services: false,
    media: false
  };
  environment = environment;  // Make environment available in template

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor(public translationService: TranslationService, private router: Router, private headerService: HeaderService) {
    this.translationService.currentLang$.subscribe(lang => {
      if (this.currentLang !== lang) {
        this.currentLang = lang;
        this.fetchMenuItems();
      }
    });
  }

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
        /*   console.log(
            '%c MENU %c %o',
            'background:#00A86B;color:#fff;padding:2px 6px;border-radius:4px;font-weight:600',
            '',                     
            this.menuItems       
          ); */
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    setTimeout(() => {
      const currentUrl = this.router.url;
      const newUrl = currentUrl.replace(/^\/[a-z]{2}/, `/${lang}`);
      this.router.navigateByUrl(newUrl);
    }, 100);
  }

  submenuOpen: { [key: string]: boolean } = {};

  openSubmenu(menuName: string) {
    this.submenuOpen[menuName] = true;
  }

  closeSubmenu(menuName: string) {
    this.submenuOpen[menuName] = false;
  }

  toggleMobileSubmenu(key: string) {
    this.mobileSubmenuOpen[key] = !this.mobileSubmenuOpen[key];
  }

  getLastSegment(url: string): string[] {
    const parts = url.split('/').filter(Boolean);
    return ['/', this.currentLang, ...parts.slice(-2)];
  }
}