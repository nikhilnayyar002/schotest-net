import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginResolverService } from './guards/login-resolver.service';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',
    component: LoginComponent,
    resolve: {
      status: LoginResolverService
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
