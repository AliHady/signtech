import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { TranslationService, TranslationsModule } from '@support-link/translations';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { SliderItemDto } from '../models/slider.model';
import { environment } from '../../../../environments/environment';
import { NgxTypedJsModule } from 'ngx-typed-js';

interface Slide {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslationsModule, NgxTypedJsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  public swiper: Swiper | undefined;
  currentSlideIndex = 0;
  private languageSubscription: Subscription;
  slides: Slide[] = [];
  loading = true;
  error = '';

  typingConfig = {
    strings: [''],
    typeSpeed: 30,
    backSpeed: 20,
    backDelay: 2000,
    startDelay: 500,
    loop: false,
    showCursor: true,
    cursorChar: '|'
  };

  constructor(
    private translationService: TranslationService,
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
    this.languageSubscription = this.translationService.currentLang$.subscribe(() => {
      this.getSliders();
    });
  }

  ngOnInit(): void {
    this.getSliders();
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

  private getSliders(): void {
    this.loading = true;
    this.error = '';
    this.slides = [];

    this.homeService.getSliders().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.slides = response
            .map(item => ({
              title: item.Title || '',
              description: item.ContentSummary || '',
              imageUrl: item.SliderImage || '',
              link: item.SliderLink || ''
            }));

          // Update typing strings when slides are loaded
          if (this.slides.length > 0) {
            this.typingConfig.strings = [this.slides[0].description];
          }
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
        this.error = 'Failed to load sliders. Please try again later.';
        this.loading = false;
        console.error('Error loading sliders:', err);
      }
    });
  }

  private initializeSwiper() {
    if (!this.slides.length) return;

    this.swiper = new Swiper('.slider-swiper', {
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
          // Update typing strings when slide changes
          if (this.slides[this.currentSlideIndex]) {
            this.typingConfig.strings = [this.slides[this.currentSlideIndex].description];
          }
        }
      }
    });
  }
} 