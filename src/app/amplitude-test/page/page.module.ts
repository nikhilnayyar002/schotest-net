import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsComponent } from './questions/questions.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { McqsComponent } from './mcqs/mcqs.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [QuestionsComponent, InstructionsComponent, McqsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PageModule { }
