import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div *ngIf="!hasConsent" class="cookie-consent">
      <div class="cookie-content">
        <p>{{ 'COOKIE_CONSENT.MESSAGE' | translate }}</p>
        <div class="cookie-buttons">
          <button (click)="acceptCookies()" class="accept-btn">
            {{ 'COOKIE_CONSENT.ACCEPT' | translate }}
          </button>
          <button (click)="declineCookies()" class="decline-btn">
            {{ 'COOKIE_CONSENT.DECLINE' | translate }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-consent {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      color: #344549;
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
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      animation: fadeIn 0.8s ease-out forwards;
      animation-delay: 0.2s;
      opacity: 0;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .cookie-content p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #344549;
      font-family: inherit;
    }

    .cookie-buttons {
      display: flex;
      gap: 1rem;
      flex-shrink: 0;
      animation: fadeIn 0.8s ease-out forwards;
      animation-delay: 0.4s;
      opacity: 0;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: inherit;
      position: relative;
      overflow: hidden;
    }

    button::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    button:hover::after {
      transform: translateX(0);
    }

    .accept-btn {
      background: #344549;
      color: white;
    }

    .accept-btn:hover {
      background: #2a373a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(52, 69, 73, 0.2);
    }

    .decline-btn {
      background: transparent;
      border: 2px solid #344549;
      color: #344549;
    }

    .decline-btn:hover {
      background: rgba(52, 69, 73, 0.05);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .cookie-consent {
        bottom: 1rem;
        padding: 1.25rem;
      }

      .cookie-content {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
      }

      .cookie-buttons {
        width: 100%;
        justify-content: center;
      }

      button {
        padding: 0.6rem 1.2rem;
        font-size: 0.85rem;
      }
    }
  `]
})
export class CookieConsentComponent implements OnInit {
  hasConsent = false;

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
      this.hasConsent = consent === 'accepted' || consent === 'declined';
      if (this.hasConsent) {
        this.removeComponent();
      }
    }
  }

  private removeComponent() {
    const element = this.elementRef.nativeElement;
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  acceptCookies() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('CookieConsent', 'accepted');
      this.hasConsent = true;
      this.removeComponent();
    }
  }

  declineCookies() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('CookieConsent', 'declined');
      this.hasConsent = true;
      this.removeComponent();
    }
  }
} 