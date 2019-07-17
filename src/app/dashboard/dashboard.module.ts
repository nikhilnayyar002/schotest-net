import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ParentComponent } from './parent/parent.component';

import { CategoryModule } from './category/category.module';
import { FavouriteModule} from './favourite/favourite.module';
import { PausedModule} from './paused/paused.module';
import { CompletedModule} from './completed/completed.module';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    CategoryModule,
    FavouriteModule,
    PausedModule,
    CompletedModule,

    DashboardRoutingModule
  ]
})
export class DashboardModule { }
