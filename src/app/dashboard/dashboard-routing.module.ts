import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ParentComponent } from "./parent/parent.component";
import { AuthGuard } from '../guards/auth.guard';
import { categoryRoutes } from "./category/category-routing.module";

const routes: Routes = [
  {
    path: "dashboard",
    component: ParentComponent,
    canActivate: [AuthGuard],
    // children:[
    //   {
    //     path:'',
    //     canActivateChild:[AuthGuard],
    //     children:[
    //       {
    //         path:'category',
    //         children:categoryRoutes
    //       }
    //     ]
    //   }
    // ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
