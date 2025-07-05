import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    LoadingOverlayComponent,
    PopupComponent,
    BreadcrumbsComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    PopupComponent,
    LoadingOverlayComponent
  ]
})
export class SharedModule { } 