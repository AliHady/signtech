import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-services.component.html',
  styleUrls: ['./featured-services.component.scss']
})
export class FeaturedServicesComponent {
  constructor() {}
} 