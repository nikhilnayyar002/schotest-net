import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
