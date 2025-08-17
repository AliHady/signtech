import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '@signtech/translations';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { AuthService } from 'libs/core/http/services/auth.service';
import { RequestItem } from '../models/requests.model';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RequestPriorityEnum } from '../enums/priority.enum';
import { ROLES } from '@signtech/core/http';
import { RequestService } from '../services/request.service';

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
  currentLang = 'ar';
  userName: string = '';
  search: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  totalItems = 0;
  loading = true;
  error = '';
  public RequestStatusEnum = RequestStatusEnum
  public RequestPriorityEnum = RequestPriorityEnum;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private translationService: TranslationService) {
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

    var userRole = this.authService.getUserRole();
    if (userRole?.toLowerCase() === ROLES.ADMIN.toLowerCase()) {
      this.getAllRequests();
    }
    else {
      this.getMyRequests();
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  getMyRequests(): void {
    this.loading = true;
    this.requestService.getMyRequests(this.currentPage, this.itemsPerPage, this.search).subscribe({
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

  getAllRequests(): void {
    this.loading = true;
    this.requestService.getAllRequests(this.currentPage, this.itemsPerPage, this.search).subscribe({
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
    this.router.navigate(['/', this.currentLang, 'dashboard', 'requests', id]);
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
}