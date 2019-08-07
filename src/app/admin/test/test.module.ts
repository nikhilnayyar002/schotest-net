import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ParentComponent } from './parent/parent.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [ParentComponent, TestEditorComponent, QuestionEditorComponent, QuestionsComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TestModule { }
