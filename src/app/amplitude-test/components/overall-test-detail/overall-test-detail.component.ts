import { Component, OnInit, Input } from '@angular/core';
import { QuestionState } from '../../shared/global';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { TestWithFeaturesForUser } from '../../modals/test';

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

  tbDatas:{[index:string]:TbData} ={};
  test:TestWithFeaturesForUser;
  sections:string[];

  constructor(private store:Store<GLobalState>) { }

  ngOnInit() {
    this.store.select(state=>state.test).subscribe((test)=>{
      if(test) {
        this.test = test;
        for(let s in test.sections) 
          this.tbDatas[s] = {
            questions:0, answered:0, unAnswered:0, marked:0, unVisited:0, markedAnswered:0
          }
        for(let id in test.questions) {
          let t=this.tbDatas[test.questions[id].section]
          switch(test.questions[id].state) {
            case QuestionState.Answered: ++t.answered; break
            case QuestionState.Unanswered: ++t.unAnswered; break
            case QuestionState.Marked: ++t.marked; break
            case QuestionState.Markedanswered: ++t.markedAnswered; break  
            case QuestionState.Unvisited: ++t.unVisited; break
            default :  ++t.unVisited; break
          }
        }
        this.sections = Object.keys(test.sections);
      }
    })
  }
}