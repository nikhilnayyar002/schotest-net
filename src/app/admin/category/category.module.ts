import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ParentComponent } from './parent/parent.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule} from '../../dashboard/components/components.module'

@NgModule({
  declarations: [ParentComponent, CategoryEditorComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    ComponentsModule
  ]
})
export class CategoryModule { }
