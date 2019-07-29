import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ParentComponent } from './parent/parent.component';
import { MainService } from './main.service';
import { DashboardResolverService } from './guard/dashboard.resolver';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ],
  providers:[MainService, DashboardResolverService]
})
export class DashboardModule { }
