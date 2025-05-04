// libs/shared/translations/src/lib/translations/translation.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.initializeTranslations();
  }

  private initializeTranslations() {
    // Add supported languages
    this.translate.addLangs(['en', 'ar']);
    
    // Set default language
    this.translate.setDefaultLang('en');

    // Check browser language or local storage
    const savedLang = isPlatformBrowser(this.platformId) 
      ? localStorage.getItem('CurrentLanguage') || 'en'
      : 'en';
    
    // Set initial language
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    // Ensure the language is supported
    if (!this.translate.getLangs().includes(lang)) {
      console.warn(`Language ${lang} is not supported. Falling back to default language.`);
      lang = 'en';
    }

    // Set the language
    this.translate.use(lang).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
          localStorage.setItem('CurrentLanguage', lang);
        }
        this.currentLangSubject.next(lang);
      },
      error: (error) => {
        console.error('Error switching language:', error);
        // Fallback to default language on error
        this.translate.use('en');
        this.currentLangSubject.next('en');
      }
    });
  }

  toggleLanguage() {
    const current = this.currentLangSubject.value;
    this.setLanguage(current === 'en' ? 'ar' : 'en');
  }
}