import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { AdminResolverService } from '../guards/resolver';

const routes: Routes = [
  {
    path: "",
    component: ParentComponent
  },
  {
    path: 'create',
    component: CategoryEditorComponent
  },
  {
    path: 'edit/:id',
    component: CategoryEditorComponent,
    resolve:{
      category:AdminResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
