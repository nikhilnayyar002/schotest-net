import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/amplitude-test/modals/answer';
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from 'src/data/config';

@Component({
  selector: 'app-answer-editor',
  templateUrl: './answer-editor.component.html',
  styleUrls: ['./answer-editor.component.scss']
})
export class AnswerEditorComponent {

  backendError: string;
  submitting: boolean = false;


  //work as "edit" component
  @Input() question:QuestionOriginal;
  @Input() testID:string;
  @Input() answer:Answer;

  options:string[] = ["-----"];
  correctOption:string;

  form = this.fb.group({
    data: [""]
  });

  constructor(private fb: FormBuilder, private ms:MainService)
  // private store: Store<GLobalState>,
  // private router: Router,
  // private route: ActivatedRoute,
  {}

  ngAfterViewInit(): void {
    this.data.setValue(this.answer.data?this.answer.data:"")
    if(this.question.answers) {
      this.options.concat(this.question.answers)
    }
    if(this.answer) this.correctOption = this.answer.value
    else this.correctOption = this.options[0]
  }

  get data() {return this.form.get("data") as FormControl;}


  submit() {
    this.submitting = true
    let answer:Answer =  {
      _id:this.question._id,
      tID:this.testID,
      value:this.correctOption,
      data:this.data.value
    }
     
    this.ms.postAnswer(answer, !this.answer).subscribe(
      () => {
        this.submitting = false; this.backendError = ''
        this.answer = answer
      },
      (error:any) =>{
        this.submitting = false; this.backendError = ''
        this.backendError = error.error.message
      }
    )
  }

  /**
   * CK Editor
   *
   * IMPORT:
   *  import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
   *
   * HTML:
   *      <ckeditor [(ngModel)]="editorModal" [editor]="editor" (ready)="onReady($event)"
   *       [config]="editorConfig">
   *      </ckeditor>
   *
   * CODE:
   */
  editor = DocumentEditor;
  editorModal: string = "";
  editorConfig = config.ckEditor.config;
  onReady(editor): void {
    // console.log(Array.from( editor.ui.componentFactory.names() ))
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }
}
