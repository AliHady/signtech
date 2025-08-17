import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CMSHeaderMenuComponent } from './cms-header-menu/cms-header-menu.component';
import { CMSDataComponent } from './cms-data/cms-data.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    CMSDataComponent,
    CMSHeaderMenuComponent
  ],
  exports: [ CMSHeaderMenuComponent]
})
export class ContentModule { } 