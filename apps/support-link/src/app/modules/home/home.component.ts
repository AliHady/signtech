import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SliderComponent } from './slider/slider.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { JoinNowComponent } from './join-now/join-now.component';
import { HeaderComponent } from '../../shared/layouts/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SliderComponent,
    JoinNowComponent,
    HeaderComponent,
    SubscriptionComponent,
    OurServicesComponent,
    ReviewsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }
} 