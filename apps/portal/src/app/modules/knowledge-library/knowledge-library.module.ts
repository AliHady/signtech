import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KnowledgeLibraryHomeComponent } from './knowledge-library-home/knowledge-library-home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    KnowledgeLibraryHomeComponent
  ],
  exports: [
    KnowledgeLibraryHomeComponent 
  ]
})
export class KnowledgeLibraryModule { } 