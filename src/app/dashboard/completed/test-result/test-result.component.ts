import { Component, OnInit } from '@angular/core';
import { ParentService } from '../parent.service';
import { TestResponse } from 'src/app/amplitude-test/modals/test';
import { QuestionsAnswers } from 'src/app/shared/global';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  test:TestResponse;
  quesAns:QuestionsAnswers;

  constructor(
    private ps:ParentService,
    private route:ActivatedRoute
    ) {
    this.test = this.ps.currentSelectedTest
  }

  ngOnInit() {
    this.quesAns = this.route.snapshot.data.questionsAnswers
    console.log(this.quesAns)
  }

}
