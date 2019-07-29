import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { DashboardResolverService } from '../guard/dashboard.resolver';

const routes: Routes = [
  {
    path: "",
    component: ParentComponent,
    resolve:{
      categories:DashboardResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

  
})
export class FavouriteRoutingModule { }
