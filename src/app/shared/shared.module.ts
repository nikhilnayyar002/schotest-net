import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeStylePipe } from './safe-style.pipe';
import { TimerPipe } from './timer.pipe';
import { DebounceClickDirective } from './debounce-click.directive';
@NgModule({
  declarations: [
    SafeStylePipe, TimerPipe, DebounceClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SafeStylePipe, TimerPipe, DebounceClickDirective
  ]
})
export class  SharedModule { }
