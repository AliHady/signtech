import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ListOfServicesComponent } from './list-of-services/list-of-services.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    ServiceDetailsComponent,
    ListOfServicesComponent
  ],
  exports: [
    ServiceDetailsComponent,
    ListOfServicesComponent
  ]
})
export class ServicesModule { } 