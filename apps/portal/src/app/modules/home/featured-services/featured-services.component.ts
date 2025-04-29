import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    // Set default language if not set
    if (!this.translate.currentLang) {
      this.translate.use('en');
    }
  }

  getServiceKeys(): string[] {
    return [
      'MARKET_PLATFORM',
      'SANA3I',
      'CODING',
      'PRODUCTS',
      'FACTORIES',
      'SURVEY'
    ];
  }
} 