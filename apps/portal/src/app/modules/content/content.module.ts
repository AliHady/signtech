import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { CMSHeaderMenuComponent } from './cms-header-menu/cms-header-menu.component';
import { PhotolibraryComponent } from './photolibrary/photolibrary.component';
import { VideolibraryComponent } from './videolibrary/videolibrary.component';
import { EventsComponent } from './events/events.component';
import { CMSDataComponent } from './cms-data/cms-data.component';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NewsComponent,
    NewsDetailsComponent,
    CMSDataComponent,
    CMSHeaderMenuComponent,
    PhotolibraryComponent,
    VideolibraryComponent,
    EventsComponent,
    EventDetailsComponent
  ],
  exports: [NewsComponent, CMSHeaderMenuComponent, PhotolibraryComponent, VideolibraryComponent, EventsComponent]
})
export class ContentModule { } 