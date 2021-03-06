import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ParentComponent } from './parent/parent.component';
import { TestsComponent } from './tests/tests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/dashboard/components/components.module';

@NgModule({
  declarations: [ParentComponent, TestsComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ComponentsModule,
    SharedModule
  ],
})
export class CategoryModule { }
