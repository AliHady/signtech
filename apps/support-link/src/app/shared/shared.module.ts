import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NavigationMenuComponent } from './layouts/navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NavigationMenuComponent,
    LoadingOverlayComponent,
    BreadcrumbsComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationMenuComponent,
    BreadcrumbsComponent,
    LoadingOverlayComponent
  ]
})
export class SharedModule { } 