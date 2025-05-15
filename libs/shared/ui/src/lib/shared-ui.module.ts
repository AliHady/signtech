import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTranslationModule } from './translation.module';

@NgModule({
  imports: [
    CommonModule,
    SharedTranslationModule
  ],
  exports: [
    SharedTranslationModule
  ]
})
export class SharedUiModule { } 