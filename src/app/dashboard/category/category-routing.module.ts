import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { TestsComponent } from './tests/tests.component';
import { DashboardResolverService } from '../guard/dashboard.resolver';
export const categoryRoutes: Routes = [
  {
    path: "",
    component: ParentComponent,
    resolve:{
      categories:DashboardResolverService
    }
  },
  {
    path:':id',
    component: TestsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
