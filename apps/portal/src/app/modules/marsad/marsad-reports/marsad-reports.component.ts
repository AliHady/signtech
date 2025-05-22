import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SelectSearchComponent, TextInputComponent } from '@nimic/shared/ui';
import { TranslationService } from '@nimic/translations';
import { environment } from '../../../../environments/environment';
import { ContentService } from '../../content/services/content.service';
import {  ReportsResponse, Report as MarsadReport } from '../models/reports.model';

@Component({
  selector: 'app-marsad-reports',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    RouterModule,
    NgxChartsModule,
    BreadcrumbsComponent,
    FormsModule,
    SelectSearchComponent,
    TextInputComponent
  ],
  templateUrl: './marsad-reports.component.html',
  styleUrls: ['./marsad-reports.component.scss'],
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
export class MarsadReportsComponent implements OnInit {
  environment = environment;
  currentLang: string = 'ar';
  selectedCategory: number | null = null;
  categories: { value: number; label: string }[] = [];
  allReports: MarsadReport[] = [];
  showLightbox = false;
  selectedReport: MarsadReport | null = null;
  isMaximized = true;
  safeUrl: SafeResourceUrl | null = null;
  searchQuery: string = '';
  viewMode: 'list' | 'card' = 'list';
  private rawCategories: ReportsResponse = [];

  constructor(
    private translationService: TranslationService,
    private sanitizer: DomSanitizer,
    private contentService: ContentService
  ) { }



  ngOnInit() {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.fetchReports();
  }



  get filteredReports() {
    let reports: MarsadReport[] = [];

    if (this.selectedCategory) {
      const category = this.rawCategories.find(c => c.Id === this.selectedCategory);
      reports = category ? category.Reports : [];
    } else {
      reports = this.rawCategories.flatMap(category => category.Reports);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      reports = reports.filter(report =>
        report.ReportTitle.toLowerCase().includes(query) ||
        (report.ReportDesc && report.ReportDesc.toLowerCase().includes(query))
      );
    }

    return reports;
  }

  get selectedCategoryTitle(): string {
    if (!this.selectedCategory) {
      return this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories';
    }

    const category = this.rawCategories.find(c => c.Id === this.selectedCategory);
    return category
      ? (this.currentLang === 'ar' ? category.Title : (category.TitleEn || category.Title))
      : (this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories');
  }
  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200);
  }

  openReport(report: MarsadReport): void {
    this.selectedReport = report;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(report.Link);
    this.showLightbox = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedReport = null;
    this.showLightbox = false;
    this.isMaximized = true;
    document.body.style.overflow = '';
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'card' : 'list';
  }

  fetchReports() {
    this.contentService.getReports().subscribe({
      next: (reports) => {
        this.rawCategories = reports;
        this.allReports = reports.flatMap(category => category.Reports);

        this.categories = [
          { value: 0, label: this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories' },
          ...this.rawCategories.map(cat => ({
            value: cat.Id,
            label: this.currentLang === 'ar' ? cat.Title : (cat.TitleEn || cat.Title)
          }))
        ];

        this.selectedCategory = 0;
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }
} 