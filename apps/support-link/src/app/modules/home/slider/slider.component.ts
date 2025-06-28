import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsModule } from '@support-link/translations';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { SliderItemDto } from '../models/slider.model';
import { HomeService } from '../services/home.service';
import { UtilityService } from '../../../shared/services/utility.service';


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

  sliderItems: SliderItemDto[] = [];

  constructor(private homeService: HomeService, public utilityService: UtilityService) { }

  ngOnInit() {
    this.homeService.getSliders().subscribe(items => {
      this.sliderItems = items;
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
}