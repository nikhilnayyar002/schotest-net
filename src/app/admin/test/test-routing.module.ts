import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
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
    component: TestEditorComponent,
    resolve:{
      categories:AdminResolverService
    }
  },
  {
    path: 'edit/:id',
    component: TestEditorComponent,
    resolve:{
      data:AdminResolverService
    },
    runGuardsAndResolvers: 'always',
    children:[
      {
        path: 'questions',
        component: QuestionsComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
