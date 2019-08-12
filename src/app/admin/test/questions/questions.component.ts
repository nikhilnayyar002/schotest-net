import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TestOriginal } from 'src/app/amplitude-test/modals/test';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import { MainService } from '../../main.service';
import { createAccordianState } from 'src/app/shared/global';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  test:TestOriginal;
  questions:QuestionOriginal[];
  sections: {sectionOrder: number, name: string}[]=[];

  addNewQuestion:boolean = false;
  addNewQuestions:boolean = false;
  addAnswers:boolean = false;

  editQuestion: {question:QuestionOriginal, qNo:number} = {question:null, qNo:null};

  constructor(
    private route:ActivatedRoute,
    private ms:MainService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.parent.data.data) {
      this.test =  this.route.snapshot.parent.data.data["test"];
    }
    if(this.test) {
      for(let prop in this.test.sections) {
        this.sections.push({
          name: prop,
          sectionOrder:this.test.sections[prop].sectionOrder
        })
      }
      this.ms.getQuestions(this.test._id).subscribe(questions=>this.questions = questions)
    }
  }

  onCardHeaderClick = createAccordianState();
  onCloseForm() {
    /** "CloseForm" event is automatic and is done by "question-editor" when its done
     *  saving the question at database server.
     *  therefore refresh questions to get realtime changes:
     */
    this.questions = null;
    this.addNewQuestion =  this.addNewQuestions = false;
    this.ms.getQuestions(this.test._id).subscribe(questions=>this.questions = questions)
  }
  onEditQuestionClick(question:QuestionOriginal, index:number) {
    this.editQuestion.question = question;
    this.editQuestion.qNo = index + 1;
    this.addNewQuestion = true;
  }
}
