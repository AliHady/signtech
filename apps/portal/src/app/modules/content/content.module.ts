import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NewsComponent,
    NewsDetailsComponent
    
  ],
  exports: [NewsComponent]
})
export class ContentModule { } 