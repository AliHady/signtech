import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';
import { ContactUsComponent } from '../help/contact-us/contact-us.component';
import { SharedModule } from '../../shared/shared.module';
import { ApplyToTarmeezComponent } from './apply-to-tarmeez/apply-to-tarmeez.component';
import { RequestCodeComponent } from './request-code/request-code.component';
import { TranslateModule } from '@ngx-translate/core';
import { SenaiComponent } from './senai/senai.component';
import { EmploymentComponent } from '../help/employment/employment.component';
import { SearchForNcageComponent } from './search-for-ncage/search-for-ncage.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    ServiceDetailsComponent,
    ListOfServicesComponent,
    ContactUsComponent,
    ApplyToTarmeezComponent,
    RequestCodeComponent,
    SenaiComponent,
    EmploymentComponent,
    SearchForNcageComponent
  ],
  exports: [
    ServiceDetailsComponent,
    ListOfServicesComponent,
    ContactUsComponent,
    ApplyToTarmeezComponent,
    RequestCodeComponent,
    SenaiComponent,
    EmploymentComponent,
    SearchForNcageComponent
  ]
})
export class EservicesModule { } 