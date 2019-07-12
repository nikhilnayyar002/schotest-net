import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {SubSink} from 'subsink'
import { TestState } from '../../state/test.state';
import { SetQuestionState, SetIndex } from '../../state/state.actions';
import { QuestionState, checkAndGetQuestionState } from '../../shared/global';
import { Question } from '../../modals/question';

@Component({
  selector: 'app-mcq-states',
  templateUrl: './mcq-states.component.html',
  styleUrls: ['./mcq-states.component.scss']
})
export class McqStatesComponent {

  questions:Question[];
  indexOfCurrQ:number=0;
  private isTestOver=false;
  
  subs=new SubSink();

  constructor(
    private store:Store<TestState>
  ) { 
    this.subs.add(
      store.pipe(select(state=>state.testOther)).subscribe(other => {
        this.indexOfCurrQ=other.index;
        this.isTestOver=other.isTestOver;
      })
    )
    this.subs.add(
      this.store.pipe(select(state=>state.test.questions)).subscribe((questions)=>this.questions=questions)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  /**
   * Get a bootstrap badge class 
   * given the state of Question. This gives badges color.
   * Eg: Unanswered question are red in color.
   */
  getBadgeType(type: QuestionState) {
    switch (type) {
      case QuestionState.Answered: return "badge-success"
      case QuestionState.Unanswered: return "badge-danger"
      case QuestionState.Marked: return "badge-primary"
      /**
       * Here Markedanswered should have different icon
       */
      case QuestionState.Markedanswered: return "badge-primary"
      case QuestionState.Unvisited: return "badge-secondary"
      default: return ''
    }
  }

  /**
   * click the badge and get a question selected.
   */
  badgeClick(value: string) {
    if(this.isTestOver) return
    let i = +value.split(':')[1]
    let state=checkAndGetQuestionState(this.questions[this.indexOfCurrQ])
    this.store.dispatch(SetQuestionState({state:state, index:this.indexOfCurrQ}))
    this.store.dispatch(SetIndex({index:i}))
  }


}
