import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { MediaCenterComponent } from './media-center/media-center.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NewsComponent,
    NewsDetailsComponent,
    MediaCenterComponent
  ],
  exports: [NewsComponent, MediaCenterComponent]
})
export class ContentModule { } 