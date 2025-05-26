import { Component, OnInit, AfterViewInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
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
import { NgxTypedJsModule } from 'ngx-typed-js';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-knowledge-library-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule, BreadcrumbsComponent],
  templateUrl: './knowledge-library-home.component.html',
  styleUrls: ['./knowledge-library-home.component.scss'],
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
export class KnowledgeLibraryHomeComponent implements OnInit, AfterViewInit {
  currentLang = 'ar';
  private langSubscription: Subscription;
  private isRTL = false;

  

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object,
    private contentService: ContentService
  ) {
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRTL = lang === 'ar';
    });
  }

  ngOnInit() {
    
    this.isRTL = this.currentLang === 'ar';
  }

  ngAfterViewInit() {
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout((window as any).resizeTimeout);
    (window as any).resizeTimeout = setTimeout(() => {
    }, 250);
  }

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200); 
  }

  fetchReportsKPI() {
    this.contentService.getReportsKPI().subscribe({
      next: (response: any) => {
        if (!response || !Array.isArray(response)) {
          console.error('Invalid response format:', response);
          return;
        }
      },
      error: (error) => {
        console.error('Error fetching KPI reports:', error);
      }
    });
  }
} 