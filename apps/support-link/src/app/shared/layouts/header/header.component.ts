import { Component, OnInit } from '@angular/core';
import { TranslationService, TranslationsModule } from '@support-link/translations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { Header, HeaderItem } from '../../models/header.model';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { AuthService, ROLES } from '@support-link/core/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslationsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLang = 'ar';
  menuItems: HeaderItem[] = [];
  loading = true;
  error = '';
  openIndex: number | null = null;
  menuOpen: boolean = false;
  isLoggedIn = false;
  fullName = '';
  userRoles$: Observable<string[]> = of([]); roles = ROLES;

  constructor(
    public translationService: TranslationService,
    private headerService: HeaderService,
    private router: Router,
    private authService: AuthService) {

    this.authService.isLoggedIn$.subscribe(async isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userRoles$ = this.authService.getRoles$();
        this.fullName = this.authService.getFullName();
      } else {
        this.userRoles$ = of([]);
        this.fullName = '';
      }
    });

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
        this.menuItems = response;
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

  // toggleDropdown(idx: number, url: string) {
  //   if (url) {
  //     return ['/', this.currentLang, url];
  //   } else {
  //     this.openIndex = this.openIndex === idx ? null : idx;
  //     return null;
  //   }
  // }

  toggleDropdown(index: number): void {
    // Only toggle if the menu item has submenus
    if (this.menuItems[index].SubMenus?.length) {
      this.openIndex = this.openIndex === index ? null : index;
    } else {
      this.openIndex = null;
      this.menuOpen = false;
    }
  }


  logout() {
    this.authService.logout();
    location.reload();
  }
}