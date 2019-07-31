import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { TestsComponent } from './tests/tests.component';
import { AdminResolverService } from '../guards/resolver';

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
        component: CategoryEditorComponent
      },
      {
        path: 'tests',
        component: TestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
