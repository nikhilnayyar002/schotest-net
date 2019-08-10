import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from './question-card/question-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [QuestionCardComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[QuestionCardComponent]
})
export class ComponentsModule { }
