import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {SubSink} from 'subsink'
import { TestState } from '../../state/test.state';
import { SetQuestionState, SetIndex } from '../../state/state.actions';
import { QuestionState, checkAndGetQuestionState } from '../../shared/global';
import { TestWithFeaturesForUser } from '../../modals/test';

@Component({
  selector: 'app-mcq-states',
  templateUrl: './mcq-states.component.html',
  styleUrls: ['./mcq-states.component.scss']
})
export class McqStatesComponent {

  questions:string[];
  id:string;
  test:TestWithFeaturesForUser;
  private isTestOver=false;
  
  subs=new SubSink();

  constructor(
    private store:Store<TestState>
  ) { 
    this.subs.add(
      store.pipe(select(state=>state.testOther)).subscribe(other => {
        this.id=other.id;
        this.isTestOver=other.isTestOver;
      })
    )
    this.subs.add(
      this.store.pipe(select(state=>state.test)).subscribe((test)=>{
        this.test=test
        if(test) this.questions = Object.keys(test.questions)
      })
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
      default: return "badge-secondary"
    }
  }

  /**
   * click the badge and get a question selected.
   */
  badgeClick(id: string) {
    if(this.isTestOver) return
    let state=checkAndGetQuestionState(this.test.questions[this.id])
    this.store.dispatch(SetQuestionState({state:state, id:this.id}))
    this.store.dispatch(SetIndex({id}))
  }

  checkIfMarkedAnswered(state:QuestionState) {
    if(state ==QuestionState.Markedanswered) return true
    else return false
  }


}
