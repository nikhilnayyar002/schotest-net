import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PausedRoutingModule } from './paused-routing.module';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    PausedRoutingModule
  ]
})
export class PausedModule { }
