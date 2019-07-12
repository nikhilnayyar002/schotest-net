import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ParentComponent } from "./parent/parent.component";
import { PausedComponent } from "./paused/paused.component";
import { CompletedComponent } from "./completed/completed.component";
import { FavouriteComponent } from "./favourite/favourite.component";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: ParentComponent,
    children: [
      { path: 'category',   redirectTo: '', pathMatch: 'full' },
      { path: "", component: CategoryComponent },
      { path: "favourite", component: FavouriteComponent },
      { path: "paused", component: PausedComponent },
      { path: "completed", component: CompletedComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
