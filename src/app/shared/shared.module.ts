import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeStylePipe } from './safe-style.pipe';
import { TimerPipe } from './timer.pipe';

@NgModule({
  declarations: [
    SafeStylePipe, TimerPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SafeStylePipe, TimerPipe
  ]
})
export class  SharedModule { }
