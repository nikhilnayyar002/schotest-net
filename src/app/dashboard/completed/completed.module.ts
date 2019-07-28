import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedRoutingModule } from './completed-routing.module';
import { ParentComponent } from './parent/parent.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    CompletedRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class CompletedModule { }
