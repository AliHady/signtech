import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ServiceDetailsComponent,
    ListOfServicesComponent,
    ContactUsComponent
  ],
  exports: [
    ServiceDetailsComponent,
    ListOfServicesComponent,
    ContactUsComponent
  ]
})
export class EservicesModule { } 