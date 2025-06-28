import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroItem {
  image: string;
  title: string;
  highlight: string;
  dot: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  heroItems: HeroItem[] = [
    {
      image: '../../../../assets/images/slider-1.png',
      title: 'We will show you the way to ',
      highlight: 'Success',
      dot: '.'
    },
    {
      image: '../../../../assets/images/slider-1.png',
      title: 'Grow your business with ',
      highlight: 'Support',
      dot: '.'
    },
    {
      image: '../../../../assets/images/slider-1.png',
      title: 'Achieve your goals with ',
      highlight: 'Experts',
      dot: '.'
    }
  ];

  currentSlide = 0;

  goToSlide(idx: number) {
    this.currentSlide = idx;
  }

  next() {
    if (this.currentSlide < this.heroItems.length - 1) {
      this.currentSlide++;
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}