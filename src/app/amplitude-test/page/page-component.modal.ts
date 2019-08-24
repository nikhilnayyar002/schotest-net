import { Output, EventEmitter } from '@angular/core';

export class PageComponent {
   @Output() closeEvent=new EventEmitter<boolean>();
   public closeTheComponent() {
    this.closeEvent.emit(true);
   }
}
