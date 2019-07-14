import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ParentComponent } from './parent/parent.component';
import { CategoryComponent } from './category/category.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PausedComponent } from './paused/paused.component';
import { CompletedComponent } from './completed/completed.component';

@NgModule({
  declarations: [ParentComponent, CategoryComponent, FavouriteComponent, PausedComponent, CompletedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
