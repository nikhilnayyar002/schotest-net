import { Component, OnInit, Input } from '@angular/core';
import { TestWithFeatures, UserTest } from 'src/app/amplitude-test/modals/test';
import { QuestionsAnswers } from 'src/app/shared/global';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent{

  @Input() test: TestWithFeatures;
  @Input() res: { userTest: UserTest; questionsAnswers: QuestionsAnswers; };

  questions:string[];
  currQID:string;
  questionNoInput:string='';
  questionBtnState:"comprehension"|"question"|"solution"|"answer";

  ngOnInit() {
    this.questions = Object.keys(this.res.questionsAnswers.questions)
    //set 1st question as default question
    this.currQID = this.questions[0]
    this.questionBtnState = this.res.questionsAnswers.questions[this.currQID].isComprehension?"comprehension":"question";
  }

  setQuestion(questionNo:string) {
    let no = parseInt(questionNo)
    if(!isNaN(no) && no >=0 && no<=this.questions.length) {
      this.currQID = this.questions[no-1]
      this.setQuestionBtnState()
    }
  }

  setQuestionBtnState() {
    this.questionBtnState = 
      this.res.questionsAnswers.questions[this.currQID].isComprehension?"comprehension":"question";
  }

  setNextQuestion(id:string, side:'back'|'front') {
    let index
    if(side == 'front') {
      console.log(this.questions.indexOf(id))
      index= this.questions.indexOf(id) != (this.questions.length - 1)?(this.questions.indexOf(id)+1):0
      console.log(index)
    } else {
      index= this.questions.indexOf(id) != 0?(this.questions.indexOf(id)-1):(this.questions.length - 1)
    }
    this.currQID = this.questions[index]
    this.setQuestionBtnState()    
  }

}
