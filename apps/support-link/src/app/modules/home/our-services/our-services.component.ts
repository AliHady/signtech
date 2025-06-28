import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from '@support-link/translations';
import { ServiceItemDto } from '../models/our-services.model';
import { HomeService } from '../services/home.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, TranslationsModule],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {
  currentSlide = 0;
  services: ServiceItemDto[] = [];

  constructor(private homeService: HomeService, public utilityService: UtilityService) { }

  ngOnInit() {
    this.homeService.getOurServices().subscribe(data => {
      this.services = data;
    });
  }
}