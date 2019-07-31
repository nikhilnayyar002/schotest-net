import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ParentComponent } from './parent/parent.component';
import { MainService } from './main.service';
import { AdminResolverService } from './guards/resolver';


@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers:[MainService, AdminResolverService]
})
export class AdminModule { }
