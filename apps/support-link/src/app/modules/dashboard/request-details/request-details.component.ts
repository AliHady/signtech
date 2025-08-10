import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@support-link/translations';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { AuthService } from 'libs/core/http/services/auth.service';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RequestDetails } from '../models/request-details.model';
import { RequestPriorityEnum } from '../enums/priority.enum';
import { RequestService } from '../services/request.service';
import { AddCommentDto } from '../models/add-comment.model';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'apps/support-link/src/environments/environment';
import { CommentItem } from '../models/comment.model';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  standalone: true,
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaSiteKey
    }
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
  ]
})
export class RequestDetailsComponent implements OnInit {
  requestId!: string;
  comments: CommentItem[] = [];
  pageIndex = 1;
  pageSize = 5;
  hasMoreComments = true;
  loadingMore = false;
  newComment = '';
  loading = false;
  error = '';
  currentLang = 'ar';
  isLoading = false;
  selectedRequest: RequestDetails | null = null;
  public RequestStatusEnum = RequestStatusEnum
  public RequestPriorityEnum = RequestPriorityEnum;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private translate: TranslateService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private translationService: TranslationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.requestId = this.route.snapshot.paramMap.get('id')!;
    this.getRequestDetails(this.requestId);
    this.loadComments(true);
  }

  loadComments(reset = false) {
    if (reset) {
      this.comments = [];
      this.pageIndex = 1;
      this.hasMoreComments = true;
    }
    this.loading = true;
    this.requestService.getComments(this.requestId, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        const items = response.Items || [];
        if (items.length < this.pageSize || this.comments.length + items.length >= response.TotalCount) {
          this.hasMoreComments = false;
        }
        this.comments = [...this.comments, ...items];
        this.loading = false;
        this.loadingMore = false;
      },
      error: () => {
        this.error = this.translate.instant('COMMENTS.LOAD_ERROR');
        this.loading = false;
        this.loadingMore = false;
      }
    });
  }

  loadMoreComments() {
    if (this.hasMoreComments && !this.loadingMore) {
      this.pageIndex++;
      this.loadingMore = true;
      this.loadComments();
    }
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const dto: AddCommentDto = {
      RequestId: this.requestId,
      Content: this.newComment
    };

    this.recaptchaV3Service.execute('login').subscribe({
      next: (token) => {
        this.requestService.addComment(dto, token).subscribe({
          next: () => {
            this.newComment = '';
            this.loadComments(true);
          },
          error: () => {
            this.error = 'Failed to add comment.';
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('reCAPTCHA error:', error);
      }
    });
  }

  getRequestDetails(id: string) {
    this.loading = true;
    this.requestService.getRequestDetails(id).subscribe({
      next: (response) => {
        this.selectedRequest = response;
        this.selectedRequest.Id = id;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests. Please try again later.';
        this.loading = false;
        console.error('Error loading requests:', err);
      }
    });
  }
}