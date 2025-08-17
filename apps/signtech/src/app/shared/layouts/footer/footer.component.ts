import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterModel } from '../../models/footer.model';
import { FooterService } from '../../services/footer.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '@signtech/translations';
import { Subscription } from 'rxjs';
import { TranslationsModule } from '@signtech/translations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TranslationsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  footer: FooterModel[] = [];
  loading = true;
  error = '';
  currentYear = new Date().getFullYear();
  currentLanguage: string = 'ar';
  private langSubscription: Subscription = new Subscription();

  constructor(
    private footerService: FooterService,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.getFooter();
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  private getFooter(): void {
    this.loading = true;
    this.footerService.getFooter().subscribe({
      next: (response) => {
        this.footer = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load footer. Please try again later.';
        this.loading = false;
        console.error('Error loading footer:', err);
      }
    });
  }

  navigateToLink(url: string) {
  }
} 