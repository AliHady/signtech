import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';

@Component({
  selector: 'app-list-of-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BreadcrumbsComponent, FooterComponent],
  templateUrl: './list-of-services.component.html',
  styleUrls: ['./list-of-services.component.scss']
})
export class ListOfServicesComponent { } 