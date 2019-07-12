import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPageSwitch]'
})
export class PageSwitchDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
