import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MainService } from '../../main.service';
import { Category } from 'src/app/modals/category';
import { BackendStatus } from 'src/app/shared/global';

@Component({
  selector: "app-category-editor",
  templateUrl: "./category-editor.component.html",
  styleUrls: ["./category-editor.component.scss"]
})
export class CategoryEditorComponent {
  configData = config;
  backendError: string;
  submitting: boolean = false;
  tests:string[]=[]
  @ViewChild("pageContent", {static:false}) pageContent:ElementRef<HTMLElement>;

  form = this.fb.group({
    title: ["", [Validators.required]],
    syllabus: [""],
    image:[""],
    testID:[""]
  });

  constructor(private fb: FormBuilder, private ms:MainService)
  // private store: Store<GLobalState>,
  // private router: Router,
  // private route: ActivatedRoute,
  {}

  get title(): any {return this.form.get("title") as FormControl;}
  get image(): any {return this.form.get("image") as FormControl;}  
  get syllabus(): any {return this.form.get("syllabus") as FormControl;} 

  removeTest(i:number) {
    this.tests.splice(i, 1);
  }

  submit() {
    this.submitting = true;
    let category:Category =  {
        name:this.title.value,
        tests: this.tests,
        lastUpdated: new Date(),
        _id:(new Date()).getTime().toString(),
        syllabus:this.syllabus.value,
        image:this.image.value
    }
     
    this.ms.postCategory(category).subscribe(
      () => {this.submitting = false; this.form.reset(); this.tests = []; },
      (error:any) =>{
        this.submitting = false;
        this.backendError = error.error.message
        setTimeout(() => {
          this.pageContent.nativeElement.scrollTo(0, this.pageContent.nativeElement.scrollHeight)
        }, 0);
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
