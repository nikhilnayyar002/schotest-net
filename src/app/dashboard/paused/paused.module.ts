import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PausedRoutingModule } from './paused-routing.module';
import { ParentComponent } from './parent/parent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    PausedRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PausedModule { }
