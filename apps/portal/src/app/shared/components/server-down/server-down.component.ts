import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server-down',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './server-down.component.html',
  styles: []
})
export class ServerDownComponent implements OnInit, OnDestroy {
  currentLang = 'ar';
  private langSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  retryConnection() {
    // Navigate to home page
    this.router.navigate([this.currentLang, 'home']);
  }

  ngOnInit() {
    // Get language from URL
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
        this.translate.use(lang);
      } else {
        // Set default language if not in URL
        this.translationService.setLanguage('ar');
        this.translate.use('ar');
      }
    });

    // Subscribe to language changes
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    // Debug translations
   /*  this.translate.get('NOT_FOUND.HOME_BUTTON').subscribe(
      value => console.log('Translation value:', value),
      error => console.error('Translation error:', error)
    ); */
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
} 