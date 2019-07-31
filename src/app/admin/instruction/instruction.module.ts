import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    InstructionRoutingModule
  ]
})
export class InstructionModule { }
