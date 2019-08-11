import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { TestEditorComponent } from './test-editor/test-editor.component';
import { AdminResolverService } from '../guards/resolver';
import { QuestionsComponent } from './questions/questions.component';


const routes: Routes = [
  {
    path: "",
    component: ParentComponent
  },
  {
    path: 'create',
    component: TestEditorComponent
  },
  {
    path: 'edit/:id',
    component: TestEditorComponent,
    resolve:{
      data:AdminResolverService
    },
    children:[
      {
        path: 'questions',
        component: QuestionsComponent,
        // children:[
        //   {
        //     path:'add',
        //     component: QuestionEditorComponent
        //   },
        //   {
        //     path:'edit/:qid',
        //     component: QuestionEditorComponent
        //   }
        // ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
