import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarsadHomeComponent } from './marsad-home/marsad-home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MarsadHomeComponent
  ],
  exports: [
    MarsadHomeComponent
  ]
})
export class MarsadModuleModule { } 