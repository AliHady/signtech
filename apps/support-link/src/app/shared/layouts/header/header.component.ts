import { Component, OnInit } from '@angular/core';
import { TranslationService, TranslationsModule } from '@support-link/translations';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { Header } from '../../models/header.model';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  subMenus?: MenuItem[];
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
        this.getHeader();
      }
    });
  }

  ngOnInit() {
    this.getHeader();
  }

  private getHeader() {
    this.loading = true;
    this.error = '';
    this.headerService.getHeader().subscribe({
      next: (response: Header) => {
        this.menuItems = response.map(item => ({
          id: item.Id,
          title: item.Title,
          url: item.Url,
          children: item.SubMenus?.map(child => ({
            id: child.Id,
            title: child.Title,
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
}