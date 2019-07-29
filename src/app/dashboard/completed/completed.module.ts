import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedRoutingModule } from './completed-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ComponentsModule } from 'src/app/dashboard/components/components.module';
import { TestResultComponent } from './test-result/test-result.component';

@NgModule({
  declarations: [ParentComponent, TestResultComponent],
  imports: [
    CommonModule,
    CompletedRoutingModule,
    ComponentsModule
  ]
})
export class CompletedModule { }
