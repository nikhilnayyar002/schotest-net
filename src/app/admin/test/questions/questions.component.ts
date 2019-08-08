import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TestOriginal } from 'src/app/amplitude-test/modals/test';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  addNewQuestion:boolean = false;
  test:TestOriginal;
  questions:QuestionOriginal[];
  sections: {sectionOrder: number, name: string}[]=[];

  constructor(
    private route:ActivatedRoute,
    private ms:MainService
  ) { }

  ngAfterViewInit(): void {
    this.test = this.route.snapshot.parent.data.test
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
}
