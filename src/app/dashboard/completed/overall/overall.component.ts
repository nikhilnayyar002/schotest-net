import { Component, OnInit, Input } from "@angular/core";
import { QuestionsAnswers } from "src/app/shared/global";
import { UserTest, TestWithFeatures } from 'src/app/amplitude-test/modals/test';

@Component({
  selector: "app-overall",
  templateUrl: "./overall.component.html",
  styleUrls: ["./overall.component.scss"]
})
export class OverallComponent implements OnInit {
  @Input() test: TestWithFeatures;
  @Input() res: { userTest: UserTest; questionsAnswers: QuestionsAnswers };

  overallProp = {
    totalCorrect: 0,
    totalAttempt: 0,
    totalQuestions: 0,
    scoredMarks: 0,
    totalMarks: 0
  };

  isAllSet: boolean = false;

  ngOnInit() {
    this.overallProp.totalQuestions = this.test.nOfQ;
    this.overallProp.totalMarks = this.test.marks;
    let { userTest, questionsAnswers } = this.res;
    //set more properties
    for (let q in userTest.questions) {
      ++this.overallProp.totalAttempt;
      if (userTest.questions[q] == questionsAnswers.answers[q].value) {
        this.overallProp.scoredMarks += questionsAnswers.questions[q].marks;
        ++this.overallProp.totalCorrect;
      }/** Negative marking */
      else if(userTest.questions[q]!=null) {
        --this.overallProp.scoredMarks;
      }
    }

    //all done
    this.isAllSet = true;
  }
}
