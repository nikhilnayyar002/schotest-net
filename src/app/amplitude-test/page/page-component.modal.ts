import { Output, EventEmitter } from '@angular/core';

export class PageComponent {
   @Output() closeEvent=new EventEmitter<boolean>();
   protected closeTheComponent() {
    this.closeEvent.emit(true);
   }
}
