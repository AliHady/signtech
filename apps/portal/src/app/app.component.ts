import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';

@Component({
  imports: [
    RouterModule, 
    TranslateModule, 
    CommonModule,
    LoadingOverlayComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'portal';
  currentLang = 'en';
  isLoading = false;

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

    // Subscribe to router events to show/hide loading overlay
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationStart') {
        this.isLoading = true;
      } else if (event.constructor.name === 'NavigationEnd' || 
                 event.constructor.name === 'NavigationError' || 
                 event.constructor.name === 'NavigationCancel') {
        this.isLoading = false;
      }
    });
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
