import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCardComponent } from './test-card/test-card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[TestCardComponent]
})
export class ComponentsModule { }
