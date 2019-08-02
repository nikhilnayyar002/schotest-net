import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: "admin",
    component: ParentComponent,
    canActivate: [AuthGuard],
    data:{ iam:"admin" },
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
            path:'test',
            loadChildren:() => import('./test/test.module').then(mod => mod.TestModule),
          },
          {
            path:'instruction',
            loadChildren:() => import('./instruction/instruction.module').then(mod => mod.InstructionModule),
          },
          {
            path:'user',
            loadChildren:() => import('./user/user.module').then(mod => mod.UserModule),
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
export class AdminRoutingModule { }
