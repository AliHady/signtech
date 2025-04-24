import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TranslationService } from './../../../../libs/shared/translations/src/lib/translations/translation.service';
//import { TranslationService } from '@nimic/libs/shared/translations';
@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal';
  constructor(public translationService: TranslationService) {}
  
  get currentLang() {
    return this.translationService.currentLang$;
  }
}
