import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { MediaCenterComponent } from './media-center/media-center.component';
import { PhotolibraryComponent } from './photolibrary/photolibrary.component';
import { VideolibraryComponent } from './videolibrary/videolibrary.component';
import { EventsComponent } from './events/events.component';
import { CMSDataComponent } from './cms-data/cms-data.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NewsComponent,
    NewsDetailsComponent,
    CMSDataComponent,
    MediaCenterComponent,
    PhotolibraryComponent,
    VideolibraryComponent,
    EventsComponent
  ],
  exports: [NewsComponent, MediaCenterComponent, PhotolibraryComponent, VideolibraryComponent, EventsComponent]
})
export class ContentModule { } 