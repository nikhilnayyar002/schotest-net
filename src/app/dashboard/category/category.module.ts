import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ParentComponent } from './parent/parent.component';
import { TestsComponent } from './tests/tests.component';

@NgModule({
  declarations: [ParentComponent, TestsComponent],
  imports: [
    CommonModule,
  ],
})
export class CategoryModule { }
