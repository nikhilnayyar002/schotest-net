import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ParentComponent } from './parent/parent.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsComponent } from './questions/questions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../components/components.module';
import *  as DashboardComponents from '../../dashboard/components/components.module';
import { BatchAddQuestionsComponent } from './batch-add-questions/batch-add-questions.component';
import { AnswerEditorComponent } from './answer-editor/answer-editor.component';
import { AnswersComponent } from './answers/answers.component';

@NgModule({
  declarations: [ParentComponent, TestEditorComponent, QuestionEditorComponent, QuestionsComponent, BatchAddQuestionsComponent, AnswerEditorComponent, AnswersComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    ComponentsModule,
    DashboardComponents.ComponentsModule
  ]
})
export class TestModule { }
