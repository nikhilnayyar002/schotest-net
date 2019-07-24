import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../modals/question';


@Component({
  selector: 'app-mcq-page',
  templateUrl: './mcq-page.component.html',
  styleUrls: ['./mcq-page.component.scss']
})
export class McqPageComponent {


  @Input() question:Question;
  @Output('emit') questionEmitEvent= new EventEmitter<Question>();

  onClick(index) {
    /**
     * first of all the 1st line of this function is because
     * @checkedAnswerIndex was not seem to be updated in here.
     * You can also simple do
     *    this.question.checkedAnswerIndex=index
     * But the line below seems to be more meaningfull.
     */
    this.question={...this.question, checkedAnswerIndex:index }
    //emit the new question
    this.questionEmitEvent.emit(this.question)
  }



}
