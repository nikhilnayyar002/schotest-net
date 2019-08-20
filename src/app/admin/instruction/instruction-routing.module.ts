import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { InstructionEditorComponent } from './instruction-editor/instruction-editor.component';
import { AdminResolverService } from '../guards/resolver';

const routes: Routes = [
  {
    path: "",
    component: ParentComponent
  },
  {
    path: 'create',
    component: InstructionEditorComponent
  },
  {
    path: 'edit/:id',
    component: InstructionEditorComponent,
    resolve:{
      instruction:AdminResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructionRoutingModule { }
