import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeService } from '../services/home.service';
import { News } from '../../content/models/news.model';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '@nimic/translations';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  news: News[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  currentLang = 'ar';

  constructor(
    private homeService: HomeService,
    public translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.homeService.getLatestNews().subscribe({
      next: (response) => {
        this.news = response.Items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load news. Please try again later.';
        this.loading = false;
        console.error('Error loading news:', err);
      }
    });
  }


  navigateToNewsDetails(newsItem: News): void { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/' ,this.currentLang,'mediacenter', 'news', newsItem.Title], {
      state: { id: newsItem.Id }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 