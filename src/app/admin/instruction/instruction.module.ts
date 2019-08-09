import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { ParentComponent } from './parent/parent.component';
import { InstructionEditorComponent } from './instruction-editor/instruction-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [ParentComponent, InstructionEditorComponent],
  imports: [
    CommonModule,
    InstructionRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class InstructionModule { }
