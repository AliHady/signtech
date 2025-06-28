import { Component, OnInit } from '@angular/core';
import { TranslationService, TranslationsModule } from '@support-link/translations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { Header } from '../../models/header.model';
import { TranslateModule } from '@ngx-translate/core';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  subMenus?: MenuItem[];
}

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslationsModule, TranslateModule],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  isMenuOpen = false;
  currentLang = 'ar';
  isMobileMenuOpen = false;
  menuItems: MenuItem[] = [];
  loading = true;
  error = '';

  openIndex: number | null = null;

  toggleDropdown(idx: number) {
    this.openIndex = this.openIndex === idx ? null : idx;
  }

  constructor(
    public translationService: TranslationService,
    private headerService: HeaderService,
    private router: Router) {
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
          title: this.currentLang == 'ar' ? item.Title : item.TitleEn,
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
}