import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsModule } from '@signtech/translations';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { SliderItemDto } from '../models/slider.model';
import { HomeService } from '../services/home.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '@signtech/translations';


interface SlideItem {
  image: string;
  title: string;
  highlight: string;
  dot: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslationsModule, NgxTypedJsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  currentLang = 'ar';
  sliderItems: SliderItemDto[] = [];

  constructor(private homeService: HomeService,public translationService: TranslationService, public utilityService: UtilityService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.homeService.getSliders().subscribe(items => {
      this.sliderItems = items;
    });

    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });
  }

  currentSlide = 0;

  goToSlide(idx: number) {
    this.currentSlide = idx;
  }

  next() {
    if (this.currentSlide < this.sliderItems.length - 1) {
      this.currentSlide++;
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  navigateToLogin() {
    console.log('Navigating to login');
    this.router.navigate(['/', this.currentLang, 'auth', 'login']);
  }
}