import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { curveMonotoneX } from 'd3-shape';
import { isPlatformBrowser } from '@angular/common';
import { ContentService } from '../../content/services/content.service';
import { KpiReportsResponse } from '../models/reports-kpi.model';

@Component({
  selector: 'app-marsad',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule, RouterModule, NgxChartsModule],
  templateUrl: './marsad-home.component.html',
  styleUrls: ['./marsad-home.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MarsadHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselList') carouselList!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;

  currentLang: string = 'ar';
  private langSubscription: Subscription;
  private currentPosition = 0;
  private itemWidth = 0;
  private containerWidth = 0;
  private totalItems = 0;
  private visibleItems = 0;
  private isRTL = false;
  // Chart configurations
  view: [number, number] = [0, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'السنة';
  yAxisLabel = 'القيمة';
  timeline = false;
  autoScale = true;
  roundDomains = true;
  curve = curveMonotoneX;
  backgroundColor = '#2D3C3F';
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00E676', '#00B0FF', '#651FFF', '#FF9100', '#FF1744']
  };
  rangeFillOpacity = 0.35;

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  // Chart data
  //https://swimlane.gitbook.io/ngx-charts/features   for Chart Types


  marsadData = {
    totalEmploymentData: [
      {
        name: 'إجمالي العمالة',
        nameEn: 'Total Employment',
        summary: '900 الف عامل',
        summaryEn: '900 Thousand Workers',
        growth: 'نمو عدد العمالة خلال خمس سنوات',
        growthEn: 'Employment Growth Over Five Years',
        chartType: 'line',
        series: [
          { name: '2020', value: 900000 },
          { name: '2021', value: 950000 },
          { name: '2022', value: 1000000 },
          { name: '2023', value: 1050000 },
          { name: '2024', value: 1100000 }
        ]
      }
    ],
    investmentVolumeData: [
      {
        name: 'حجم الاستثمار',
        nameEn: 'Investment Volume',
        summary: '1,221 مليار <span class="icon-Saudi_Riyal_Symbol summeryIcon"></span> ',
        summaryEn: '<span class="icon-Saudi_Riyal_Symbol summeryIcon"></span> 1,221 Billion',
        growth: 'نمو حجم الاستثمار خلال خمس سنوات',
        growthEn: 'Investment Growth Over Five Years',
        chartType: 'line',
        series: [
          { name: '2020', value: 970 },
          { name: '2021', value: 1039 },
          { name: '2022', value: 1062 },
          { name: '2023', value: 1152 },
          { name: '2024', value: 1221 }
        ]
      }
    ],
    miningLicensesData: [
      {
        name: 'إجمالي الرخص التعدينية السارية',
        nameEn: 'Total Mining Licenses',
        summary: '2453',
        summaryEn: '2,453',
        growth: 'نمو عدد الرخص السارية للخمس سنوات',
        growthEn: 'Growth in Active Licenses Over Five Years',
        chartType: 'line',
        series: [
          { name: '2020', value: 1451 },
          { name: '2021', value: 1868 },
          { name: '2022', value: 2179 },
          { name: '2023', value: 2375 },
          { name: '2024', value: 2453 }
        ]
      }
    ],
    establishmentsCountData: [
      {
        name: 'عدد المنشآت الصناعية',
        nameEn: 'Industrial Establishments',
        summary: '11,988',
        summaryEn: '11,988',
        growth: 'نمو عدد المنشأت الصناعية',
        growthEn: 'Growth in Industrial Establishments',
        chartType: 'line',
        series: [
          { name: '2020', value: 9769 },
          { name: '2021', value: 10373 },
          { name: '2022', value: 10602 },
          { name: '2023', value: 11628 },
          { name: '2024', value: 11988 }
        ]
      }
    ],
    nonOilExportsData: [
      {
        name: 'الصادرات غير النفطية',
        nameEn: 'Non-Oil Exports',
        summary: '214 مليار <span class="icon-Saudi_Riyal_Symbol summeryIcon"></span> ',
        summaryEn: '<span class="icon-Saudi_Riyal_Symbol summeryIcon"></span> 214 Billion',
        growth: 'نمو عدد الصادرات غير النفطية',
        growthEn: 'Growth in Non-Oil Exports',
        chartType: 'line',
        series: [
          { name: '2020', value: 151 },
          { name: '2021', value: 233 },
          { name: '2022', value: 263 },
          { name: '2023', value: 212 },
          { name: '2024', value: 214 }
        ]
      }
    ]
  };

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private contentService: ContentService
  ) {
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRTL = lang === 'ar';
      // Reset position when language changes
      this.currentPosition = 0;
      if (this.carouselList) {
        this.carouselList.nativeElement.style.transform = 'translateX(0)';
      }
      this.checkCarouselVisibility();
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.add('marsadTheme');
    }
    this.isRTL = this.currentLang === 'ar';
    this.updateChartSize();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCarousel();
      this.checkCarouselVisibility();
      this.updateChartSize();
    });
  }

  @HostListener('window:resize')
  onResize() {
    // Add debounce to prevent too many calculations
    clearTimeout((window as any).resizeTimeout);
    (window as any).resizeTimeout = setTimeout(() => {
      this.checkCarouselVisibility();
      this.updateChartSize();
    }, 250);
  }

  onPrevClick() {
    if (this.isRTL ? this.currentPosition > -(this.totalItems - this.visibleItems) * this.itemWidth : this.currentPosition < 0) {
      this.slide(this.isRTL ? 'next' : 'prev');
    }
  }

  onNextClick() {
    if (this.isRTL ? this.currentPosition < 0 : this.currentPosition > -(this.totalItems - this.visibleItems) * this.itemWidth) {
      this.slide(this.isRTL ? 'prev' : 'next');
    }
  }

  private initializeCarousel() {
    if (this.carouselList && this.carouselContainer) {
      this.totalItems = this.carouselList.nativeElement.children.length;
      this.updateCarouselDimensions();
      this.updateCarouselDirection();
    }
  }

  private updateCarouselDimensions() {
    if (this.carouselList && this.carouselContainer) {
      const firstItem = this.carouselList.nativeElement.children[0] as HTMLElement;
      this.itemWidth = firstItem.offsetWidth + 16; // 16px for gap
      this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
      this.visibleItems = Math.floor(this.containerWidth / this.itemWidth);
      
      // Calculate total width of all items
      const totalWidth = this.totalItems * this.itemWidth;
      const needsCarousel = totalWidth > this.containerWidth;
      
      // Update button visibility immediately
      if (this.prevBtn && this.nextBtn) {
        if (!needsCarousel) {
          this.prevBtn.nativeElement.style.display = 'none';
          this.nextBtn.nativeElement.style.display = 'none';
          this.currentPosition = 0;
          this.carouselList.nativeElement.style.transform = 'translateX(0)';
        } else {
          this.prevBtn.nativeElement.style.display = 'flex';
          this.nextBtn.nativeElement.style.display = 'flex';
          this.updateButtonStates();
        }
      }
    }
  }

  private updateCarouselDirection() {
    if (this.carouselList) {
      this.carouselList.nativeElement.style.direction = this.isRTL ? 'rtl' : 'ltr';
      // Reset position when direction changes
      this.currentPosition = 0;
      this.carouselList.nativeElement.style.transform = 'translateX(0)';
      this.updateButtonStates();
    }
  }

  private slide(direction: 'prev' | 'next') {
    if (!this.carouselList) return;

    const maxPosition = -(this.totalItems - this.visibleItems) * this.itemWidth;
    const step = this.itemWidth;
    
    if (direction === 'next' && this.currentPosition > maxPosition) {
      // Calculate remaining space to ensure we don't overshoot
      const remainingSpace = Math.abs(this.currentPosition - maxPosition);
      const moveAmount = Math.min(step, remainingSpace);
      this.currentPosition -= moveAmount;
    } else if (direction === 'prev' && this.currentPosition < 0) {
      // Calculate remaining space to ensure we don't overshoot
      const remainingSpace = Math.abs(this.currentPosition);
      const moveAmount = Math.min(step, remainingSpace);
      this.currentPosition += moveAmount;
    }

    this.carouselList.nativeElement.style.transform = `translateX(${this.currentPosition}px)`;
    this.updateButtonStates();
  }

  private updateButtonStates() {
    if (this.prevBtn && this.nextBtn) {
      const maxPosition = -(this.totalItems - this.visibleItems) * this.itemWidth;
      
      // For RTL, we need to swap the logic
      if (this.isRTL) {
        this.prevBtn.nativeElement.disabled = this.currentPosition <= maxPosition;
        this.nextBtn.nativeElement.disabled = this.currentPosition >= 0;
      } else {
        this.prevBtn.nativeElement.disabled = this.currentPosition >= 0;
        this.nextBtn.nativeElement.disabled = this.currentPosition <= maxPosition;
      }
    }
  }

  private checkCarouselVisibility() {
    if (this.carouselList && this.carouselContainer) {
      this.updateCarouselDimensions();
    }
  }

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200); 
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.querySelector('#marsad-home-navigation')?.clientHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private updateChartSize() {
    if (this.chartContainer) {
      const container = this.chartContainer.nativeElement;
      const width = container.offsetWidth;
      const height = 400; // Fixed height for better consistency
      this.view = [width, height];
    }
  }
  fetchReportsKPI() {
    this.contentService.getReportsKPI().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching KPI reports:', error);
      }
    });
  }
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.remove('marsadTheme');
    }
    this.langSubscription.unsubscribe();
  }
} 