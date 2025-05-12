import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-marsad-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './marsad.component.html',
  styleUrls: ['./marsad.component.scss']
})
export class MarsadComponent implements OnDestroy {
  currentLang = 'ar';
  private langSubscription: Subscription;

  constructor(private translationService: TranslationService) {
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200); // Small delay to ensure navigation has started
  }
  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}  