import { Component, OnInit, Input } from '@angular/core';
import { QuestionState } from '../../shared/global';
import { Question } from '../../modals/question';
import { Section } from '../../modals/sections';

interface TbData {
  questions:number;
  answered:number;
  unAnswered:number;
  marked:number;
  unVisited:number;
  markedAnswered:number;
}

@Component({
  selector: 'app-overall-test-detail',
  templateUrl: './overall-test-detail.component.html',
  styleUrls: ['./overall-test-detail.component.scss']
})
export class OverallTestDetailComponent implements OnInit {

  @Input() sections:Array<Section>;
  @Input() questions:Array<Question>;

  constructor() { }

  ngOnInit() {
  }

  rtnTableDetailsForSection(section:Section):TbData {
    let start=section.startQ - 1, end=section.endQ - 1,

    questions=end -start + 1, answered=0, unAnswered=0,
    marked=0, unVisited=0, markedAnswered=0
    
    for(let i=start; i<=end; ++i) 
      switch(this.questions[i].state) {
        case QuestionState.Answered: ++answered; break
        case QuestionState.Unanswered: ++unAnswered; break
        case QuestionState.Marked: ++marked; break
        case QuestionState.Markedanswered: ++markedAnswered; break  
        case QuestionState.Unvisited: ++unVisited; break
      }
    
    return {
      questions, answered, unAnswered, marked, unVisited, markedAnswered
    }
  }

}
