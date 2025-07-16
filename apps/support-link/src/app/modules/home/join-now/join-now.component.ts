import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from 'libs/shared/translations/src/lib/translations/translation.service';
import { ActivatedRoute, Router } from '@angular/router';

interface NetworkDot {
  size: string;
  top: string;
  left: string;
}

@Component({
  selector: 'app-join-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-now.component.html',
  styleUrls: ['./join-now.component.scss']
})
export class JoinNowComponent {
    currentLang = 'ar';

  constructor(public translationService: TranslationService,private route: ActivatedRoute,  private router: Router) { }

   ngOnInit() {

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  joinNow() {
    // Logic to handle the "Join Now" action
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/', this.currentLang, 'auth', 'login']);
  }
}