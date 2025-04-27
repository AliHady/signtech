import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent {
  constructor() {}
} 