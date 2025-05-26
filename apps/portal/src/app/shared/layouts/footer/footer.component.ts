import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Partner } from '../../models/partners.model';
import { FooterService } from '../../services/footer.service';
import { ImportantLink } from '../../models/importantlinks.model';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';
import { TranslationsModule } from '@nimic/translations';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TranslationsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  partners: Partner[] = [];
  importantLinks: ImportantLink[] = [];
  loading = true;
  error = '';
  currentLanguage: string = 'ar';
  private langSubscription: Subscription = new Subscription();

  constructor(
    private footerService: FooterService,
    private translationService: TranslationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.loadPartners();
    this.getImportantLinks();
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  private loadPartners(): void {
    this.loading = true;
    this.footerService.getPartners().subscribe({
      next: (response) => {
        this.partners = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load partners. Please try again later.';
        this.loading = false;
        console.error('Error loading partners:', err);
      }
    });
  }

  private getImportantLinks(): void {
    this.loading = true;
    this.footerService.getImportantLinks(true).subscribe({
      next: (response) => {
        this.importantLinks = response.Items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load partners. Please try again later.';
        this.loading = false;
        console.error('Error loading partners:', err);
      }
    });
  }

  navigateToLink(url: string) {
    this.utilityService.navigate(url, this.currentLanguage, (fullImageUrl: string) => {
      // Handle displaying the image if needed    ;
    });
  }
} 