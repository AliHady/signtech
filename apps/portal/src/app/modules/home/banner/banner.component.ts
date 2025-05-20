import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { TranslationService, TranslationsModule } from '@nimic/translations';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { BannerItemDto } from '../models/banner.model';
import { environment } from '../../../../environments/environment';

interface Slide {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, TranslationsModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {
  public swiper: Swiper | undefined;
  currentSlideIndex = 0;
  private languageSubscription: Subscription;
  slides: Slide[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;

  constructor(
    private translationService: TranslationService,
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
    this.languageSubscription = this.translationService.currentLang$.subscribe(() => {
      this.loadBanners();
    });
  }

  ngOnInit(): void {
    this.loadBanners();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwiper();
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId) && this.swiper) {
      this.swiper.destroy();
    }
  }

  private loadBanners(): void {
    this.loading = true;
    this.error = '';
    this.slides = [];

    this.homeService.getBanners().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.slides = response
            .filter(item => item.ShowInHome)
            .sort((a, b) => a.SortOrder - b.SortOrder)
            .map(item => ({
              title: item.Title || '',
              description: item.ContentSummary || '',
              imageUrl: item.BannerImage ? this.portalUrl + item.BannerImage : '',
              link: item.BannerLink || ''
            }));
        }
        this.loading = false;
        
        // Reinitialize swiper after content update
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            if (this.swiper) {
              this.swiper.destroy();
            }
            if (this.slides.length > 0) {
              this.initializeSwiper();
            }
          }, 0);
        }
      },
      error: (err) => {
        this.error = 'Failed to load banners. Please try again later.';
        this.loading = false;
        console.error('Error loading banners:', err);
      }
    });
  }

  private initializeSwiper() {
    if (!this.slides.length) return;

    this.swiper = new Swiper('.banner-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: () => {
          this.currentSlideIndex = this.swiper?.realIndex ?? 0;
        }
      }
    });
  }
} 