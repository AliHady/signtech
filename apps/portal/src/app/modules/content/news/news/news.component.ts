import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../../../shared/layouts/footer/footer.component';
import { HeaderComponent } from '../../../../shared/layouts/header/header.component';
import { TranslationService } from '@nimic/translations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent, TranslateModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  currentLang = 'en';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  getRoute(route: string): string {
    return `/${this.currentLang}${route}`;
  }
} 