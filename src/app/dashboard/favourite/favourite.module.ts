import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteRoutingModule } from './favourite-routing.module';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    FavouriteRoutingModule
  ]
})
export class FavouriteModule { }
