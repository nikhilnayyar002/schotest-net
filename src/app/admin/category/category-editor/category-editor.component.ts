import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MainService } from '../../main.service';
import { Category } from 'src/app/modals/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-category-editor",
  templateUrl: "./category-editor.component.html",
  styleUrls: ["./category-editor.component.scss"]
})
export class CategoryEditorComponent {

  pageTitle:string;
  configData = config;
  backendError: string;
  testAddError:string;
  insAddError:string;
  submitting: boolean = false;
  tests:{_id: string, name?: string}[]=[]
  instructionID:string;

  @ViewChild("pageContent", {static:false}) pageContent:ElementRef<HTMLElement>;

  //work as "edit" component
  category:Category;

  form = this.fb.group({
    title: ["", [Validators.required]],
    syllabus: [""],
    image:[""],

    testID:[""],
    insID:[""],  
  });

  constructor(private fb: FormBuilder, private ms:MainService, private route: ActivatedRoute)
  // private store: Store<GLobalState>,
  // private router: Router,
  // private route: ActivatedRoute,
  {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data["category"]
    /** Display the values */
    if(this.category) {
      this.pageTitle = "Edit "+ this.category.name

      this.title.setValue(this.category.name)
      this.image.setValue(this.category.image)
      this.syllabus.setValue(this.category.syllabus)
      this.insID.setValue(this.category.insID)
      this.instructionID = this.category.insID

      for(let id of this.category.tests) {
        this.tests.push({_id:id})
        this.ms.getTestState(id).subscribe(
          (data)=>{
            if(typeof(data)!="string") {
              let results = this.tests.filter((test)=>test._id == id)
              if(results.length) results[0].name = data.name
            }
          }
        )
      }
    } else {
      this.pageTitle = "Create New Category"
    }
  }

  get title() {return this.form.get("title") as FormControl;}
  get image() {return this.form.get("image") as FormControl;}  
  get syllabus() {return this.form.get("syllabus") as FormControl;} 
  get testID() {return this.form.get("testID") as FormControl;} 
  get insID() {return this.form.get("insID") as FormControl;} 
  
  removeTest(id:string) {
    this.tests = this.tests.filter(test => test._id !=id)
    // this.tests.splice(i, 1); // i is index(number)
  }

  addTest() {
    let id = this.testID.value
    this.testAddError = ''
    if(this.tests.find(test => test._id == id)) {
      this.testAddError = "Test already Added !!"
      return
    }
    this.ms.getTestState(id).subscribe(
      (data)=>{
        if(typeof(data)=="string") this.testAddError = data
        else this.tests.push(<any>{_id:id, name:data.name})
        this.testID.reset()
      },
      error =>{
        this.testAddError = "Error Occurred! Please try again."
        this.testID.reset()
      }
    )
  }

  addInstruction() {
    let id = this.insID.value
    this.insAddError = ''
    this.ms.getInstructionState(id).subscribe(
      (data)=>{
        if(typeof(data)=="string") this.insAddError = data
        else this.instructionID = this.insID.value
      },
      error =>{
        this.insAddError = "Error Occurred! Please try again."
      }
    )
  }

  submit() {
    this.submitting = true
    let id = this.category?this.category._id:(new Date()).getTime().toString();
    let category:Category =  {
        name:this.title.value,
        tests: this.tests.map(test => test._id),
        lastUpdated: new Date(),
        _id:id,
        syllabus:this.syllabus.value,
        image:this.image.value,
        insID:this.insID.value
    }
     
    this.ms.postCategory(category, !this.category).subscribe(
      () => {
        this.submitting = false;
        if(!this.category) { this.form.reset(); this.tests = []; }
      },
      (error:any) =>{
        this.submitting = false; this.backendError = ''
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
