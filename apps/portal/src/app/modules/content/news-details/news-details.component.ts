import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NewsDetailsComponent implements OnInit {
  @Input() newsItem: any;

  constructor() { }

  ngOnInit(): void {
  }
} 