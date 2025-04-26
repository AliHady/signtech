import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
//import { TranslationService } from '@nimic/libs/shared/translations';
@Component({
  imports: [
    NxWelcomeComponent, 
    RouterModule, 
    TranslateModule, 
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'portal';
  currentLang = 'en';

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
