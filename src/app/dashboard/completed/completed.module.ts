import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedRoutingModule } from './completed-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ComponentsModule } from 'src/app/dashboard/components/components.module';
import { TestResultComponent } from './test-result/test-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ParentComponent, TestResultComponent],
  imports: [
    CommonModule,
    CompletedRoutingModule,
    ComponentsModule,
    SharedModule,
    FormsModule
  ]
})
export class CompletedModule { }
