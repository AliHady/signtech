import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { curveMonotoneX } from 'd3-shape';
import { isPlatformBrowser } from '@angular/common';
import { ContentService } from '../../content/services/content.service';
import { KpiReportsResponse, KpiReport } from '../models/reports-kpi.model';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-marsad',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule],
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
  @ViewChildren('chartContainer') chartContainers!: QueryList<ElementRef>;

  currentLang = 'ar';
  private langSubscription: Subscription;
  private currentPosition = 0;
  private itemWidth = 0;
  private containerWidth = 0;
  private totalItems = 0;
  private visibleItems = 0;
  private isRTL = false;
  // Chart configurations
  view: [number, number] = [1200, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = '';
  timeline = false;
  autoScale = true;
  roundDomains = true;
  curve = curveMonotoneX;
  backgroundColor = 'transparent';
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#00E676', '#00B0FF', '#651FFF', '#FF9100', '#FF1744']
  };
  rangeFillOpacity = 0.35;
  textColor = '#FFFFFF';
  xAxisTickFormatting = (value: any) => value;
  yAxisTickFormatting = (value: any) => value;

  marsadData: { [key: string]: any[] } = {};


  typingConfig = {
    strings: [''],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 500,
    loop: false,
    showCursor: true,
    cursorChar: '|'
  };

  private resizeObserver: any = null;
  isChartReady = false;
  private chartInitialized = false;
  private chartContainersInitialized = new Set<string>();

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object,
    private contentService: ContentService
  ) {
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRTL = lang === 'ar';
      this.currentPosition = 0;
      if (this.carouselList) {
        this.carouselList.nativeElement.style.transform = 'translateX(0)';
      }
      this.checkCarouselVisibility();
      this.updateAxisLabels();
      this.updateTypingStrings();
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.add('marsadTheme');
    }
    this.isRTL = this.currentLang === 'ar';
    this.updateAxisLabels();
    this.fetchReportsKPI();
    this.updateTypingStrings();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCarousel();
      this.checkCarouselVisibility();
      this.initializeChartSize();
    }, 0);
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout((window as any).resizeTimeout);
    (window as any).resizeTimeout = setTimeout(() => {
      this.checkCarouselVisibility();
      this.initializeChartSize();
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
    if (!this.carouselList?.nativeElement || !this.carouselContainer?.nativeElement) {
      console.warn('Carousel elements not found');
      return;
    }

    this.totalItems = this.carouselList.nativeElement.children.length;
    this.updateCarouselDimensions();
    this.updateCarouselDirection();
  }

  private updateCarouselDimensions() {
    if (!this.carouselList?.nativeElement || !this.carouselContainer?.nativeElement) {
      return;
    }

    const firstItem = this.carouselList.nativeElement.children[0] as HTMLElement;
    if (!firstItem) {
      console.warn('No carousel items found');
      return;
    }

    this.itemWidth = firstItem.offsetWidth + 16; // 16px for gap
    this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
    this.visibleItems = Math.floor(this.containerWidth / this.itemWidth);
    
  
    const totalWidth = this.totalItems * this.itemWidth;
    const needsCarousel = totalWidth > this.containerWidth;
    

    if (this.prevBtn?.nativeElement && this.nextBtn?.nativeElement) {
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

  private updateCarouselDirection() {
    if (!this.carouselList?.nativeElement) {
      return;
    }

    this.carouselList.nativeElement.style.direction = this.isRTL ? 'rtl' : 'ltr';
    this.currentPosition = 0;
    this.carouselList.nativeElement.style.transform = 'translateX(0)';
    this.updateButtonStates();
  }

  private slide(direction: 'prev' | 'next') {
    if (!this.carouselList) return;

    const maxPosition = -(this.totalItems - this.visibleItems) * this.itemWidth;
    const step = this.itemWidth;
    
    if (direction === 'next' && this.currentPosition > maxPosition) {
      const remainingSpace = Math.abs(this.currentPosition - maxPosition);
      const moveAmount = Math.min(step, remainingSpace);
      this.currentPosition -= moveAmount;
    } else if (direction === 'prev' && this.currentPosition < 0) {
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
    if (!this.carouselList?.nativeElement || !this.carouselContainer?.nativeElement) {
      return;
    }
    this.updateCarouselDimensions();
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

  private initializeChartSize() {
    if (this.chartContainers) {
      this.chartContainers.forEach((container) => {
        const resizeObserver = new (window as any).ResizeObserver(() => {
          const rect = container.nativeElement.getBoundingClientRect();
          if (rect.width > 0) {
            this.view = [rect.width, 400];
            this.view = [...this.view];
          }
        });
        
        resizeObserver.observe(container.nativeElement);
        // Initial size calculation
        const rect = container.nativeElement.getBoundingClientRect();
        if (rect.width > 0) {
          this.view = [rect.width, 400];
          this.view = [...this.view];
        }
      });
    }
  }

  fetchReportsKPI() {
    this.contentService.getReportsKPI().subscribe({
      next: (response: any) => {
        if (!response || !Array.isArray(response)) {
          console.error('Invalid response format:', response);
          return;
        }

        this.marsadData = {
          totalEmploymentData: [this.transformKpiData(response.find(item => item?.Key === 'TotalLaborChart'))],
          investmentVolumeData: [this.transformKpiData(response.find(item => item?.Key === 'InvestmentSizeChart'))],
          miningLicensesData: [this.transformKpiData(response.find(item => item?.Key === 'MiningLicensesChart'))],
          establishmentsCountData: [this.transformKpiData(response.find(item => item?.Key === 'FactoriesCountChart'))],
          nonOilExportsData: [this.transformKpiData(response.find(item => item?.Key === 'TotalExportsChart'))]
        };

        // Initialize chart size after data is loaded
        setTimeout(() => {
          this.initializeChartSize();
        }, 100);
      },
      error: (error) => {
        console.error('Error fetching KPI reports:', error);
      }
    });
  }

  private transformKpiData(kpiData: KpiReport | undefined) {
    if (!kpiData) {
      console.warn('No KPI data found for chart');
      return null;
    }
    
    const transformed = {
      name: kpiData.Title,
      nameEn: kpiData.TitleEn,
      summary: kpiData.Summary,
      summaryEn: kpiData.SummaryEn,
      growth: kpiData.Growth,
      growthEn: kpiData.GrowthEn,
      chartType: 'line',
      series: kpiData.Details?.map(detail => ({
        name: detail.Title,
        value: detail.Value
      })) || []
    };

    console.log('Transformed KPI data:', transformed);
    return transformed;
  }

  private updateAxisLabels() {
    this.translate.get('MARSAD.YEAR').subscribe((label: string) => {
      this.xAxisLabel = label;
    });
    this.translate.get('MARSAD.VALUE').subscribe((label: string) => {
      this.yAxisLabel = label;
    });
  }

  private updateTypingStrings() {
    this.translate.get('MARSAD.DESCRIPTION').subscribe((text: string) => {
      this.typingConfig.strings = [text];
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.remove('marsadTheme');
    }
    this.langSubscription.unsubscribe();
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
} 