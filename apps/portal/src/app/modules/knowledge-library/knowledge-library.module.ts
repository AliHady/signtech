import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KnowledgeLibraryHomeComponent } from './knowledge-library-home/knowledge-library-home.component';
import { ConsultingStudiesListComponent } from './consulting-studies-list/consulting-studies-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    KnowledgeLibraryHomeComponent,
    ConsultingStudiesListComponent
  ],
  exports: [
    KnowledgeLibraryHomeComponent 
  ]
})
export class KnowledgeLibraryModule { } 