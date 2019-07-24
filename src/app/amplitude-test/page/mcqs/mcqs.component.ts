import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { TestState } from '../../state/test.state';
import { UpdateQuestion, SetQuestionState, SetIndex, ClearResponse, SetQuestion } from '../../state/state.actions';
import { checkAndGetQuestionState, QuestionState, getNextQuestionIndex } from '../../shared/global';
import { Question } from '../../modals/question';
import { Test } from '../../modals/test';

@Component({
  selector: 'app-mcqs',
  templateUrl: './mcqs.component.html',
  styleUrls: ['./mcqs.component.scss']
})
export class McqsComponent extends PageComponent{

  questions:string[];
  id:string;
  test:Test;

  subs=new SubSink();

  constructor(
    private store:Store<TestState>
  ) { 
    super()
    this.subs.add(
      store.pipe(select(state=>state.testOther.id)).subscribe(id => this.id=id)
    )
    this.subs.add(
      this.store.pipe(select(state=>state.test)).subscribe((test)=>{
        this.test = test
        if(this.test) this.questions = Object.keys(test.questions);
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onEmit(question:Question) {
   this.store.dispatch(UpdateQuestion({question:question}))
   this.store.dispatch(SetQuestion({question:question}))
  }

  next() {
    let state=checkAndGetQuestionState(this.test.questions[this.id])
    this.store.dispatch(SetQuestionState({state:state, id:this.id}))
    let id=getNextQuestionIndex(this.test.questions,this.id)
    this.store.dispatch(SetIndex({id}))
  }

  mark() {
    let state:QuestionState;
    console.log(this.test.questions[this.id].checkedAnswerIndex)
    if(this.test.questions[this.id].checkedAnswerIndex) state=QuestionState.Markedanswered
    else state=QuestionState.Marked
    this.store.dispatch(SetQuestionState({state, id:this.id}))
    let id=getNextQuestionIndex(this.test.questions,this.id)
    this.store.dispatch(SetIndex({id}))
  }

  clear() {
    this.store.dispatch(ClearResponse({question:this.test.questions[this.id]})) 
    this.store.dispatch(SetQuestionState({state:QuestionState.Unvisited, id:this.id})) 
  }

}
