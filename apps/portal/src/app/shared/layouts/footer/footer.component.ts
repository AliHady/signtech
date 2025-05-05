import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Partner } from '../../models/partners.model';
import { FooterService } from '../../services/footer.service';
import { ImportantLink } from '../../models/importantlinks.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  partners: Partner[] = [];
  importantLinks: ImportantLink[] = [];
  loading = true;
  error = '';
  currentLanguage: string = 'ar';

  constructor(
    private footerService: FooterService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.loadPartners();
    this.getImportantLinks();
    this.languageService.currentLanguage$.subscribe((lang: string) => {
      this.currentLanguage = lang;
    });
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
    this.footerService.getImportantLinks().subscribe({
      next: (response) => {
        this.importantLinks = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load partners. Please try again later.';
        this.loading = false;
        console.error('Error loading partners:', err);
      }
    });
  }
} 