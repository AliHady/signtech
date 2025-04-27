import { Component } from '@angular/core';
import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  currentLang = 'en';
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(
    public translationService: TranslationService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Subscribe to language changes
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    // Initialize translations
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.translationService.setLanguage(lang);
      }
    });
  }
  
  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    const currentUrl = this.router.url;
    const newUrl = currentUrl.replace(/^\/[a-z]{2}/, `/${lang}`);
    this.router.navigateByUrl(newUrl);
  }
} 