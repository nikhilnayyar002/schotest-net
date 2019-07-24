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
    children:[
      {
        path:'',
        canActivateChild:[AuthGuard],
        children:[
          {
            path:'',
            pathMatch: "full",
            redirectTo: 'category'
          },
          {
            path:'category',
            loadChildren:() => import('./category/category.module').then(mod => mod.CategoryModule),
          },
          {
            path:'completed',
            loadChildren:() => import('./completed/completed.module').then(mod => mod.CompletedModule),
          },
          {
            path:'paused',
            loadChildren:() => import('./paused/paused.module').then(mod => mod.PausedModule),
          },
          {
            path:'favourite',
            loadChildren:() => import('./favourite/favourite.module').then(mod => mod.FavouriteModule),
          }
        ]
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
