import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { TranslationService } from '@nimic/translations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';



@Component({
  selector: 'app-marsad-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule, RouterModule, NgxChartsModule, BreadcrumbsComponent],
  templateUrl: './marsad-reports.component.html',
  styleUrls: ['./marsad-reports.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MarsadReportsComponent implements OnInit, AfterViewInit {

  currentLang: string = 'ar';

  

  constructor(
    private translationService: TranslationService
  ) {

  }

  ngOnInit() {
 
    

  }

  ngAfterViewInit() {
    
  }

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200); 
  }

} 