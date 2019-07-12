import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TestState } from '../../state/test.state';
import { Question } from '../../modals/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent extends PageComponent{

  questions:Question[];
  subsQ:Subscription;

  constructor(
    private store:Store<TestState>
  ) { 
    super()
    this.subsQ=this.store.pipe(select(state=>state.test.questions)).subscribe((questions)=>this.questions=questions)
  }

  ngOnDestroy(): void {
    this.subsQ.unsubscribe()
  }


}
