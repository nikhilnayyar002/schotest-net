import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { DashboardResolverService } from '../guard/dashboard.resolver';
import { TestResultComponent } from './test-result/test-result.component';

const routes: Routes = [
  {
    path: "",
    component: ParentComponent,
    resolve:{
      tests:DashboardResolverService
    },
    children:[
      {
        path:':id',
        component: TestResultComponent,
        resolve:{
          questionsAnswers:DashboardResolverService
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedRoutingModule { }


