import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { HomeService } from '../services/home.service';
import { News } from '../models/news.model';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  news: News[] = [];
  loading = true;
  error = '';
  portalUrl = environment.portalUrl;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.homeService.getLatestNews().subscribe({
      next: (response) => {
        this.news = response.Items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load news. Please try again later.';
        this.loading = false;
        console.error('Error loading news:', err);
      }
    });
  }
} 