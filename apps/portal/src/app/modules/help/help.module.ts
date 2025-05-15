import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '../eservices/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'contactus',
    component: ContactUsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HelpModule { } 