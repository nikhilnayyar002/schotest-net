import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ParentComponent } from './parent/parent.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { TestsComponent } from './tests/tests.component';

@NgModule({
  declarations: [ParentComponent, CategoryEditorComponent, TestsComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
