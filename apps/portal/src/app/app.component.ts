import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TranslationService, TranslationsModule } from '@nimic/translations';
import { TranslateModule } from '@ngx-translate/core';
//import { TranslationService } from '@nimic/libs/shared/translations';
@Component({
  imports: [NxWelcomeComponent, RouterModule, TranslateModule, TranslationsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal';
  currentLang = 'en';

  constructor(public translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  
  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }
}
