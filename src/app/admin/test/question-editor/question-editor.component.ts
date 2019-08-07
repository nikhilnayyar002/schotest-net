import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../main.service';
import config from 'src/data/config';
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  pageTitle:string;
  configData = config;
  backendError: string;
  testAddError:string;
  submitting: boolean = false;
  test:{_id: string, name?: string}

  @ViewChild("pageContent", {static:false}) pageContent:ElementRef<HTMLElement>;

  //work as "edit" component
  @Input() question:QuestionOriginal;
  @Input() qNo:number=0;

  form = this.fb.group({
    content: [""],
    image: [""],
    isComprehension: [false],
    comprehensionContent: [""],
    //answers,
    section: [""],
    marks:[0, [Validators.pattern('^[0-9]+$')]],
    //sectionOrder
    testID:[""]
  });


  constructor(private fb: FormBuilder, private ms:MainService)
  {}

  ngOnInit(): void {
    /** Display the values */
    if(this.question) {
      this.pageTitle = "Edit Question No."+ this.qNo

      this.content.setValue(this.question.content)
      this.image.setValue(this.question.image)
      this.isComprehension.setValue(this.question.isComprehension)
      this.comprehensionContent.setValue(this.question.comprehensionContent)      
      this.section.setValue(this.question.section)
      this.marks.setValue(this.question.marks)
      this.testID.setValue(this.question.tID)
      if(this.question.tID) {
        this.test._id = this.question.tID
        this.ms.getTestState(this.question.tID).subscribe(
          (data)=>{
            if(typeof(data)!="string") this.test.name = data.name
          }
        )
      }
    } else {
      this.pageTitle = "Create New Question"
    }

  }

  get comprehensionContent() {return this.form.get("comprehensionContent") as FormControl;} 
  get isComprehension() {return this.form.get("isComprehension") as FormControl;} 
  get section() {return this.form.get("section") as FormControl;} 
  get content() {return this.form.get("content") as FormControl;}
  get image() {return this.form.get("image") as FormControl;}  
  get marks() {return this.form.get("marks") as FormControl;} 
  get testID() {return this.form.get("testID") as FormControl;} 


  addTest() {
    let id = this.testID.value
    this.testAddError = ''
    this.ms.getTestState(id).subscribe(
      (data)=>{
        if(typeof(data)=="string") this.testAddError = data
        else this.test.name = data.name
      },
      error =>{
        this.testAddError = "Error Occurred! Please try again."
      }
    )
  }

  // submit() {
  //   this.submitting = true
  //   let id = this.category?this.category._id:(new Date()).getTime().toString();
  //   let category:Category =  {
  //       name:this.title.value,
  //       tests: this.tests,
  //       lastUpdated: new Date(),
  //       _id:id,
  //       syllabus:this.syllabus.value,
  //       image:this.image.value
  //   }
     
  //   this.ms.postCategory(category, !this.category).subscribe(
  //     () => {
  //       this.submitting = false;
  //       if(!this.category) { this.form.reset(); this.tests = []; }
  //     },
  //     (error:any) =>{
  //       this.submitting = false;
  //       this.backendError = error.error.message
  //       setTimeout(() => {
  //         this.pageContent.nativeElement.scrollTo(0, this.pageContent.nativeElement.scrollHeight)
  //       }, 0);
  //     }
  //   )
  // }

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
