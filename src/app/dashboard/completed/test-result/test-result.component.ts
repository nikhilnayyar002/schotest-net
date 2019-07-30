import { Component, OnInit } from "@angular/core";
import { ParentService } from "../parent.service";
import { TestResponse } from "src/app/amplitude-test/modals/test";
import { QuestionsAnswers } from "src/app/shared/global";
import { ActivatedRoute } from "@angular/router";
import { UserTest } from "server/src/modal/test";

@Component({
  selector: "app-test-result",
  templateUrl: "./test-result.component.html",
  styleUrls: ["./test-result.component.scss"]
})
export class TestResultComponent implements OnInit {
  test: TestResponse;
  res: { userTest: UserTest; questionsAnswers: QuestionsAnswers; };
  selectedOption: "overall" | "q&a" = "overall";

  overallProp = {
    totalCorrect: 0,
    totalAttempt: 0,
    totalQuestions: 0,
    scoredMarks: 0,
    totalMarks: 0
  };
  questions:string[];
  currQID:string;
  questionNoInput:string='';
  questionBtnState:"comprehension"|"question"|"solution"|"answer";

  isAllSet = false;

  constructor(private ps: ParentService, private route: ActivatedRoute) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    /** Wait 1 tick for to prevent ExpressionChangedAfterItHasBeenCheckedError */
    setTimeout(() => {
        //resolved response
    this.res = this.route.snapshot.data.questionsAnswers
    if(!this.res) return
    
    //test received from Parent Component through ParentService
    let t = this.ps.tests.filter(test => test._id == this.route.snapshot.paramMap.get('id'))
    if(!t.length) return

    //set test and some properties
    this.test = t[0]
    this.overallProp.totalQuestions = this.test.questions.length
    this.overallProp.totalMarks = this.test.questions.marks


    let { userTest, questionsAnswers } = this.res
    this.questions = Object.keys(questionsAnswers.questions)

    //set 1st question as default question
    this.currQID = this.questions[0]
    this.questionBtnState = questionsAnswers.questions[this.currQID].isComprehension?"comprehension":"question";

    //set more properties
    for(let q in userTest.questions) {
      ++this.overallProp.totalAttempt
      if(userTest.questions[q] == questionsAnswers.answers[q].value) {
        this.overallProp.scoredMarks += questionsAnswers.questions[q].marks
        ++this.overallProp.totalCorrect;
      }
    }

    //all done
    this.isAllSet = true
    }, 0);
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

}
