import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AmplitudeTestResolverService } from './guard/amplitude-test.resolver';
import { AuthGuard } from '../guards/auth.guard';
import { TestDeclarationComponent } from './test-declaration/test-declaration.component';

const routes: Routes = [
  {
    path: 'test/:id',
    canActivate: [AuthGuard],
    resolve: {
      data: AmplitudeTestResolverService
    },
    children:[
      {
        path:'',
        component: ParentComponent
      },
      {
        path:'instruction',
        component: TestDeclarationComponent        
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmplitudeTestRoutingModule { }
