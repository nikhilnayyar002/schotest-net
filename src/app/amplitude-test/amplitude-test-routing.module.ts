import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { TestResolverService } from './guard/test.resolver';

const routes: Routes = [
  {
    path: 'test/:id',
    component: ParentComponent,
    resolve: {
      status: TestResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmplitudeTestRoutingModule { }
