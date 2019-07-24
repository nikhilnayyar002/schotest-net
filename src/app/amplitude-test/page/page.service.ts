import { Injectable } from '@angular/core';
import { PageItem } from './page-items';
import { InstructionsComponent } from './instructions/instructions.component';
import { McqsComponent } from './mcqs/mcqs.component';
import { QuestionsComponent } from './questions/questions.component';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPages() {
    return [
      new PageItem(InstructionsComponent,'Instructions'),
      new PageItem(McqsComponent, 'Mcqs'),
      new PageItem(QuestionsComponent, 'Questions')
    ];
  }

}
