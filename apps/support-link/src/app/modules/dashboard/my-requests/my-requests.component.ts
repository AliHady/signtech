import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from '@support-link/translations';
import { SharedModule } from '../../../shared/shared.module';
import { TextInputComponent } from '@support-link/shared/ui';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { RequestsItem } from '../models/requests.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TextInputComponent,
    FormsModule,
    TranslateModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
  ]
})
export class MyRequestsComponent implements OnInit {
  requests: RequestsItem[] = [];
  currentLang = 'ar';
  userName: string = 'Adel';
  search: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  totalItems = 0;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    public translationService: TranslationService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
}