import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteRoutingModule } from './favourite-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ParentComponent],
  imports: [
    CommonModule,
    FavouriteRoutingModule,
    ComponentsModule
  ]
})
export class FavouriteModule { }
