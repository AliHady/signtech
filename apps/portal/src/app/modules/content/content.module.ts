import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NewsComponent,
    
  ],
  exports: [NewsComponent]
})
export class ContentModule { } 