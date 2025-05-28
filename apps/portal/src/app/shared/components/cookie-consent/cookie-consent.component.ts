import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '@nimic/shared/ui';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  applicationInsights: boolean;
}

interface Window {
  ga?: (command: string, ...args: any[]) => void;
  appInsights?: {
    disable: () => void;
  };
}

declare const window: Window;

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, ToggleSwitchComponent],
  template: `
    @if (!hasConsent) {
      <div class="cookie-consent">
        <div class="cookie-content">
          <p>{{ 'COOKIE_CONSENT.MESSAGE' | translate }}</p>
          <div class="cookie-options" *ngIf="showOptions">
            <div class="cookie-option">
              <app-toggle-switch
                [(ngModel)]="cookiePrefs.essential"
                [disabled]="true"
                [label]="'COOKIE_CONSENT.ESSENTIAL' | translate"
              ></app-toggle-switch>
            </div>
            <div class="cookie-option">
              <app-toggle-switch
                [(ngModel)]="cookiePrefs.functional"
                [label]="'COOKIE_CONSENT.FUNCTIONAL' | translate"
              ></app-toggle-switch>
            </div>
            <div class="cookie-option">
              <app-toggle-switch
                [(ngModel)]="cookiePrefs.analytics"
                [label]="'COOKIE_CONSENT.ANALYTICS' | translate"
              ></app-toggle-switch>
            </div>
            <div class="cookie-option">
              <div class="flex items-center gap-2">
                <app-toggle-switch
                  [(ngModel)]="cookiePrefs.applicationInsights"
                  [label]="'COOKIE_CONSENT.APPLICATION_INSIGHTS' | translate"
                ></app-toggle-switch>
                <span class="cookie-info" title="{{ 'COOKIE_CONSENT.APPLICATION_INSIGHTS_INFO' | translate }}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="cookie-buttons">
            <button (click)="showOptions = !showOptions" class="preferences-btn">
              {{ 'COOKIE_CONSENT.PREFERENCES' | translate }}
            </button>
            <button (click)="acceptCookies()" class="accept-btn">
              {{ 'COOKIE_CONSENT.ACCEPT' | translate }}
            </button>
            <button (click)="declineCookies()" class="decline-btn">
              {{ 'COOKIE_CONSENT.DECLINE' | translate }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .cookie-consent {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      color: var(--color-nimicgreen);
      padding: 1.5rem;
      z-index: 1000;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      max-width: 1200px;
      width: 90%;
      animation: slideUp 0.5s ease-out;
      font-family: inherit;
      opacity: 0;
      animation: fadeInSlideUp 0.6s ease-out forwards;
    }

    @keyframes fadeInSlideUp {
      0% {
        opacity: 0;
        transform: translate(-50%, 20px);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }

    .cookie-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cookie-options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem 0;
    }

    .cookie-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cookie-info {
      display: inline-flex;
      align-items: center;
      color: var(--color-nimicgreen);
      opacity: 0.7;
      cursor: help;
    }

    .cookie-info:hover {
      opacity: 1;
    }

    .cookie-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.8rem;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: inherit;
      position: relative;
      overflow: hidden;
    }

    .preferences-btn {
      background: transparent;
      border: 2px solid var(--color-nimicgreen);
      color: var(--color-nimicgreen);
    }

    .preferences-btn:hover {
      background: rgba(52, 69, 73, 0.05);
    }

    .accept-btn {
      background: var(--color-nimicgreen);
      color: white;
    }

    .accept-btn:hover {
      background: #2a373a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(52, 69, 73, 0.2);
    }

    .decline-btn {
      background: transparent;
      border: 2px solid var(--color-nimicgreen);
      color: var(--color-nimicgreen);
    }

    .decline-btn:hover {
      background: rgba(52, 69, 73, 0.05);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .cookie-consent {
        bottom: 0;
        width: 100%;
        max-width: 100%;
        border-radius: 0;
      }

      .cookie-buttons {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class CookieConsentComponent implements OnInit {
  hasConsent = false;
  showOptions = false;
  cookiePrefs: CookiePreferences = {
    essential: true,
    functional: false,
    analytics: false,
    applicationInsights: false
  };

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.checkConsent();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  checkConsent() {
    if (this.isLocalStorageAvailable()) {
      const consent = localStorage.getItem('CookieConsent');
      if (consent) {
        const prefs = JSON.parse(consent);
        this.cookiePrefs = prefs;
        this.hasConsent = true;
        this.removeComponent();
        this.applyCookiePreferences(prefs);
      }
    }
  }

  private removeComponent() {
    const element = this.elementRef.nativeElement;
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  private applyCookiePreferences(prefs: CookiePreferences) {
    // Handle analytics cookies
    if (!prefs.analytics) {
      this.disableAnalyticsCookies();
    }

    // Handle functional cookies
    if (!prefs.functional) {
      this.disableFunctionalCookies();
    }

    // Handle Application Insights cookies
    if (!prefs.applicationInsights) {
      this.disableApplicationInsightsCookies();
    }
  }

  private disableAnalyticsCookies() {
    // Disable Google Analytics if present
    if (window.ga) {
      window.ga('set', 'cookieDomain', 'none');
      window.ga('set', 'allowAdFeatures', false);
    }

    // Disable other analytics cookies
    const analyticsCookies = document.cookie.split(';')
      .filter(cookie => cookie.trim().startsWith('_ga') || 
                       cookie.trim().startsWith('_gid') || 
                       cookie.trim().startsWith('_gat'));
    
    analyticsCookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }

  private disableFunctionalCookies() {
    // Disable functional cookies (like language preferences, etc.)
    const functionalCookies = document.cookie.split(';')
      .filter(cookie => !cookie.trim().startsWith('_ga') && 
                       !cookie.trim().startsWith('_gid') && 
                       !cookie.trim().startsWith('_gat') &&
                       !cookie.trim().startsWith('ai_'));
    
    functionalCookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (name !== 'CookieConsent') { // Don't remove the consent cookie
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });
  }

  private disableApplicationInsightsCookies() {
    // Disable Application Insights cookies
    const aiCookies = document.cookie.split(';')
      .filter(cookie => cookie.trim().startsWith('ai_'));
    
    aiCookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

    // Disable Application Insights tracking
    if (window['appInsights']) {
      window['appInsights'].disable();
    }
  }

  acceptCookies() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('CookieConsent', JSON.stringify(this.cookiePrefs));
      this.hasConsent = true;
      this.removeComponent();
      this.applyCookiePreferences(this.cookiePrefs);
    }
  }

  declineCookies() {
    if (this.isLocalStorageAvailable()) {
      const declinedPrefs: CookiePreferences = {
        essential: true,
        functional: false,
        analytics: false,
        applicationInsights: false
      };
      localStorage.setItem('CookieConsent', JSON.stringify(declinedPrefs));
      this.hasConsent = true;
      this.removeComponent();
      this.applyCookiePreferences(declinedPrefs);
    }
  }
} 