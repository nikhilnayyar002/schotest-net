import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AmplitudeTestResolverService } from './guard/amplitude-test.resolver';
import { AuthGuard } from '../guards/auth.guard';
import { InstructionComponent } from './instruction/instruction.component';

const routes: Routes = [
  {
    path: 'test/:id',
    canActivate: [AuthGuard],
    resolve: {
      test: AmplitudeTestResolverService
    },
    children:[
      {
        path:'',
        component: ParentComponent
      },
      {
        path:'instruction/:insID',
        component: InstructionComponent,
        resolve: {
          instruction: AmplitudeTestResolverService
        },        
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmplitudeTestRoutingModule { }
