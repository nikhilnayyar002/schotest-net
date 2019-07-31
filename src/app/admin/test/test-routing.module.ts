import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { TestEditorComponent } from './test-editor/test-editor.component';

const routes: Routes = [
  {
    path: "",
    component: ParentComponent
  },
  {
    path: ':id',
    children:[
      {
        path: '',
        component: TestEditorComponent
      },
      {
        path: 'questions',
        component: QuestionEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
