import { Component, OnInit, Input } from "@angular/core";
import { QuestionOriginal } from "src/app/amplitude-test/modals/question";
import config from "src/data/config";
import { MainService } from "../../main.service";
import { Answer } from "src/app/amplitude-test/modals/answer";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.scss"]
})
export class AnswersComponent {
  @Input() questions: QuestionOriginal[] = [];
  answers: Answer[] = [];
  @Input() testID: string;

  answersMap: { [index: string]: number } = {};

  config = config;
  submitting = false;
  backendError: string;

  problemFetchingAnswers: boolean = false;
  isAnswersInDB:boolean = false;

  constructor(private ms: MainService) {}

  ngOnInit(): void {
    /**
     * creating empty array
     * */
    for (let i = 0; i < this.questions.length; ++i) {
      this.answersMap[this.questions[i]._id] = i;
      this.answers.push(null);
    }
    this.ms.getAnswers(this.testID).subscribe(data => {
      if (typeof data == "string") {
        this.problemFetchingAnswers = true;
      } else if (data) {
        /**
         * Mapping fetched answers to there empty array positions
         * */

        data.forEach(answer => {
          this.answers[this.answersMap[answer._id]] = answer;
        });
        /** disable/enable remove btn */
        this.isAnswersInDB = data?true:false
      }
    });
  }

  saveAnswer(answer: Answer) {
    this.answers[this.answersMap[answer._id]] = answer;
  }

  submit() {
    let t = window.confirm("Is it OK?");
    if (t) {
      this.submitting = true;
      let answers = this.answers.filter(a => a != null);
      if (answers.length) {
        this.ms.postAnswers(answers).subscribe(
          () => {
            this.submitting = false;
            this.backendError = "";
            this.isAnswersInDB = true
          },
          error => {
            this.submitting = false;
            this.backendError = error.error.message;
          }
        );
      } else {
        this.submitting = false;
        this.backendError = "NO answer to save";
      }
    }
  }

  remove() {
    let t = window.confirm("Is it OK?");
    if (t) {
      this.submitting = true;
      this.ms.delAllAnswer(this.testID).subscribe(
        () => {
          this.submitting = false;
          this.isAnswersInDB = false;
          this.answers= this.answers.map(a => null)
        },
        () => (this.submitting = false)
      );
    }
  }
}
