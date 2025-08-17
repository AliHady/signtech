import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService, TranslationsModule } from '@signtech/translations';
import { ServiceItemDto } from '../models/our-services.model';
import { UtilityService } from '../../../shared/services/utility.service';
import { OurServicesService } from '../../services/services/our-services.service';

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
  currentLang = 'ar';
  constructor(
    private router: Router,
    private ourServicesService: OurServicesService,
    private route: ActivatedRoute,
    public translationService: TranslationService,
    public utilityService: UtilityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang && (lang === 'en' || lang === 'ar')) {
        this.currentLang = lang;
        this.translationService.setLanguage(lang);
      }
    });

    this.ourServicesService.getOurServices().subscribe(data => {
      this.services = data.Items;
    });
  }

  navigateToServiceDetails(serviceItem: ServiceItemDto): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/', this.currentLang, 'services', this.currentLang === 'en' ? serviceItem.TitleEn : serviceItem.Title], {
      state: { id: serviceItem.Id }
    });
  }

  navigateToAllServices() {
    console.log('Navigating to all services');
     window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/', this.currentLang, 'services']);
  }
}