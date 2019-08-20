import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginResolverService } from './guards/login-resolver.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',
    component: LoginComponent,
    resolve: {
      status: LoginResolverService
    }
  },
  {
    path:'admin',
    loadChildren:() => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad:[AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent, data:{ iam:"pageNotFound" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
