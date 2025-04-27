import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { FeaturedServicesComponent } from './featured-services/featured-services.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { MarsadComponent } from './marsad/marsad.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    BannerComponent,
    FeaturedServicesComponent,
    LatestNewsComponent,
    MarsadComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {}
} 