import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from '@nimic/shared/ui';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@nimic/translations';
import { ContentService } from '../../content/services/content.service';
import { ConsultingStudiesItem, ConsultingStudyResponse } from '../models/consulting-studies.model';
import { ConsultingStudiesService } from '../services/consulting-studies.service';

interface StudiesCache {
  [key: number]: {
    data: ConsultingStudiesItem[];
    timestamp: number;
  };
}

@Component({
  selector: 'app-consulting-studies-list',
  templateUrl: './consulting-studies-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TextInputComponent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ]
})
export class ConsultingStudiesListComponent implements OnInit {
  currentLang = 'ar';
  private studiesCache: StudiesCache = {};
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  totalItems = 0;
  loading = true;
  error = '';

  studies: ConsultingStudiesItem[] = [];
  paginatedStudies: ConsultingStudiesItem[] = [];
  filteredStudies: ConsultingStudyResponse[] = [];

  // Modal state
  isCertificateModalOpen = false;
  selectedStudy: ConsultingStudyResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private consultingStudiesService: ConsultingStudiesService) { }

  ngOnInit() {
    //this.filteredStudies = this.studies;

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
    this.getAllConsultingStudies();
  }

  openCertificateModal(id: number) {
    this.loading = true;
    this.consultingStudiesService.getConsultingStudy(id).subscribe({
      next: (response) => {
        this.selectedStudy = response;
        this.selectedStudy.Id = id;
        this.isCertificateModalOpen = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load studies. Please try again later.';
        this.loading = false;
        console.error('Error loading studies:', err);
      }
    });
  }

  downloadStudy() {
    if (!this.selectedStudy) {
      this.error = 'No study selected for download.';
      return;
    }

    this.loading = true;
    this.consultingStudiesService.downloadConsultingStudy(this.selectedStudy.Id).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attachments.zip';
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load studies. Please try again later.';
        this.loading = false;
        console.error('Error loading studies:', err);
      }
    });
  }

  closeCertificateModal() {
    this.isCertificateModalOpen = false;
    this.selectedStudy = null;
  }

  private getAllConsultingStudies(): void {
    if (this.isCacheValid(this.currentPage)) {
      const cachedData = this.studiesCache[this.currentPage];
      this.studies = cachedData.data;
      this.paginatedStudies = this.studies;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.consultingStudiesService.getAllConsultingStudies(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.studies = response.Items;
        this.totalItems = response.TotalCount;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedStudies = this.studies;

        // Cache the fetched data
        this.studiesCache[this.currentPage] = {
          data: this.studies,
          timestamp: Date.now()
        };

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load studies. Please try again later.';
        this.loading = false;
        console.error('Error loading studies:', err);
      }
    });
  }

  private isCacheValid(page: number): boolean {
    const cachedData = this.studiesCache[page];
    if (!cachedData) return false;

    const now = Date.now();
    return (now - cachedData.timestamp) < this.CACHE_DURATION;
  }
}