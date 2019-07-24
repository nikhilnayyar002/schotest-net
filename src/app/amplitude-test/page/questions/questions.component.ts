import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { Store, select } from '@ngrx/store';
import { TestState } from '../../state/test.state';
import { Test } from '../../modals/test';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent extends PageComponent{

  questions:string[];
  test:Test;
  id:string;

  constructor(
    private store:Store<TestState>
  ) { 
    super()
    this.store.pipe(take(1),select(state=>state)).subscribe((state)=>{
      this.test = state.test
      this.questions = Object.keys(this.test.questions);
      this.id = state.testOther.id
    })
  
  }


}
