import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarsadHomeComponent } from './marsad-home/marsad-home.component';
import { MarsadReportsComponent } from './marsad-reports/marsad-reports.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MarsadHomeComponent, 
    MarsadReportsComponent
  ],
  exports: [
    MarsadHomeComponent,
    MarsadReportsComponent
  ]
})
export class MarsadModuleModule { } 