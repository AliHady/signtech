import { Component, OnInit } from '@angular/core';
import { TranslationService, TranslationsModule } from '@nimic/translations';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { NavMenu } from '../../models/navmen.model';
import { TranslateModule } from '@ngx-translate/core';

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor(
    public translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    // Subscribe to language changes
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.fetchMenuItems();
    });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const lang = params['lang'];
    //   if (lang && (lang === 'en' || lang === 'ar')) {
    //     this.translationService.setLanguage(lang);
    //   }
    // });
    //this.fetchMenuItems(); 
  }

  private fetchMenuItems() {
    //console.log("fetchMenuItems called");
  
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
    //console.log("switchLanguage called with lang:", lang);
    
    // Set the language
    this.translationService.setLanguage(lang);
    
    // Update the URL after a small delay to ensure language is set
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