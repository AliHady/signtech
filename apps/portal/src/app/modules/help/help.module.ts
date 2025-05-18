import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EmploymentComponent } from './employment/employment.component';

const routes: Routes = [
  {
    path: 'contactus',
    component: ContactUsComponent,  
  },
  {
    path: 'employment',
    component: EmploymentComponent
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