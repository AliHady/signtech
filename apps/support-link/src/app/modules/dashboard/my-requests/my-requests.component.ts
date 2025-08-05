import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@support-link/translations';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { AuthService } from 'libs/core/http/services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { RequestItem } from '../models/requests.model';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RequestDetails } from '../models/request-details.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
  ]
})
export class MyRequestsComponent implements OnInit {
  requests: RequestItem[] = [];
  paginatedRequests: RequestItem[] = [];
  filteredRequests: RequestItem[] = [];

  // Modal state
  isRequestDetailsModalOpen = false;
  selectedRequest: RequestDetails | null = null;

  currentLang = 'ar';
  userName: string = '';
  search: string = '';
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  totalItems = 0;
  loading = true;
  error = '';
  public RequestStatusEnum = RequestStatusEnum

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.userName = this.authService.getFullName();
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.getMyRequests();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  getMyRequests(): void {
    this.loading = true;
    this.dashboardService.getMyRequests(this.currentPage, this.itemsPerPage, this.search).subscribe({
      next: (response) => {
        this.requests = response.Items;
        this.totalItems = response.TotalCount;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginatedRequests = this.requests;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests. Please try again later.';
        this.loading = false;
        console.error('Error loading requests:', err);
      }
    });
  }

  openRequestDetailsModal(id: string) {
    this.loading = true;
    this.dashboardService.getRequestDetails(id).subscribe({
      next: (response) => {
        this.selectedRequest = response;
        this.selectedRequest.Id = id;
        this.isRequestDetailsModalOpen = true;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests. Please try again later.';
        this.loading = false;
        console.error('Error loading requests:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedRequests();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePaginatedRequests(): void {
    this.getMyRequests();
  }

  closeRequestDetailsModal() {
    this.isRequestDetailsModalOpen = false;
    this.selectedRequest = null;
  }
}