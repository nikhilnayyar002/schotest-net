import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import config from 'src/data/config';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-batch-add-questions',
  templateUrl: './batch-add-questions.component.html',
  styleUrls: ['./batch-add-questions.component.scss']
})
export class BatchAddQuestionsComponent {

  questions:QuestionOriginal[]=[null];
  config = config;
  submitting = false;
  backendError: string;
  @Input() testID:string;
  @Output() closeForm = new EventEmitter<boolean>();

  constructor(private ms:MainService) { }

  saveQuestion(index:number, question:QuestionOriginal) {
    this.questions[index] = question
  }
  removeQuestion(index:number) {
     this.questions.splice(index, 1); // i is index(number)
  }
  submit() {
    this.submitting = true
    this.ms.postQuestions(this.questions).subscribe(
      ()=> { this.submitting = false; this.backendError = ''; this.closeForm.emit(true); },
      (error)=> { this.submitting = false; this.backendError = error.error.message}
    )
  }
}
