import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { AuthGuard} from '../../guards/auth.guard'

const routes: Routes = [
  {
    path: "favourite",
    component: ParentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

  
})
export class FavouriteRoutingModule { }
