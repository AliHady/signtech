import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTranslationModule } from './translation.module';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedTranslationModule,
    DynamicFormComponent
  ],
  exports: [
    SharedTranslationModule,
    DynamicFormComponent
  ]
})
export class SharedUiModule { } 