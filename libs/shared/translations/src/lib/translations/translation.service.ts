// libs/shared/translations/src/lib/translations/translation.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('ar');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.initializeTranslations();
    this.setupUrlLanguageDetection();
  }

  private setupUrlLanguageDetection() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        const urlLang = this.getLanguageFromUrl();
        if (urlLang && this.translate.getLangs().includes(urlLang)) {
          this.setLanguage(urlLang);
        }
      });
    }
  }

  private getLanguageFromUrl(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      const langMatch = path.match(/^\/(en|ar)/);
      return langMatch ? langMatch[1] : null;
    }
    return null;
  }

  private initializeTranslations() {
    // Add supported languages
    this.translate.addLangs(['en', 'ar']);
    
    // Set default language
    this.translate.setDefaultLang('ar');

    // Check URL first, then browser language or local storage
    const urlLang = this.getLanguageFromUrl();
    const savedLang = isPlatformBrowser(this.platformId) 
      ? urlLang || localStorage.getItem('CurrentLanguage') || 'ar'
      : 'ar';
    
    // Set initial language
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    // Ensure the language is supported
    if (!this.translate.getLangs().includes(lang)) {
      console.warn(`Language ${lang} is not supported. Falling back to default language.`);
      lang = 'ar';
    }

    // Store current language for fallback
    const previousLang = this.currentLangSubject.value;

    // Set the language
    this.translate.use(lang).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          // Update HTML attributes
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
          localStorage.setItem('CurrentLanguage', lang);
        }
        this.currentLangSubject.next(lang);
      },
      error: (error) => {
        console.error('Error switching language:', error);
        // Fallback to previous language on error
        this.translate.use(previousLang);
        this.currentLangSubject.next(previousLang);
      }
    });
  }

  toggleLanguage() {
    const current = this.currentLangSubject.value;
    const newLang = current === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}