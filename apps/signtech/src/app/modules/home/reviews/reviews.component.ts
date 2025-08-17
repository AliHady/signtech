import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home.service';
import { ReviewsResponse } from '../models/reviews.model';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  currentSlide = 0;
  reviews: ReviewsResponse[] = [];

  constructor(private homeService: HomeService, public utilityService: UtilityService) { }

  ngOnInit() {
    this.homeService.getReviews().subscribe(items => {
      this.reviews = items;
    });
  }

  get totalSlides() {
    return Math.ceil(this.reviews.length / 3);
  }

  get visibleReviews() {
    const start = this.currentSlide * 3;
    return this.reviews.slice(start, start + 3);
  }

  prev() {
    if (this.currentSlide > 0) this.currentSlide--;
  }

  next() {
    if (this.currentSlide < this.totalSlides - 1) this.currentSlide++;
  }

  goToSlide(idx: number) {
    this.currentSlide = idx;
  }
}