import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ServiceDetailsComponent,
    ListOfServicesComponent
  ],
  exports: [
    ServiceDetailsComponent,
    ListOfServicesComponent
  ]
})
export class EservicesModule { } 