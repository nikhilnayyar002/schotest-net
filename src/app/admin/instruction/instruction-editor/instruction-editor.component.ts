import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from 'src/data/config';
import { Instruction } from 'src/app/modals/instruction';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/modals/category';

@Component({
  selector: 'app-instruction-editor',
  templateUrl: './instruction-editor.component.html',
  styleUrls: ['./instruction-editor.component.scss']
})
export class InstructionEditorComponent implements OnInit {

  pageTitle:string;
  configData = config;
  backendError: string;
  submitting: boolean = false;
  @ViewChild("pageContent", {static:false}) pageContent:ElementRef<HTMLElement>;

  categories:Category[] = <any>[{_id:null,name:"-----"}];
  selectedCategory:Category = <any>{};

  //work as "edit" component
  instruction:Instruction;

  form = this.fb.group({
    title: ["", [Validators.required]],
    data: [""],
  });

  constructor(private fb: FormBuilder, private ms:MainService, private route: ActivatedRoute)
  // private store: Store<GLobalState>,
  // private router: Router,
  // private route: ActivatedRoute,
  {}

  ngOnInit(): void {
    if(this.route.snapshot.data.data) {
      this.instruction =  this.route.snapshot.data.data["instruction"];
      if(this.route.snapshot.data.data["categories"])
        this.categories = this.categories.concat(this.route.snapshot.data.data["categories"]);
    }
    /** Display the values */
    if(this.instruction) {
      this.pageTitle = "Edit "+ this.instruction.name
      this.title.setValue(this.instruction.name)
      this.data.setValue(this.instruction.data)

      this.selectedCategory._id = this.instruction.catID
      let data = this.categories.filter(cat=>cat._id ==  this.instruction.catID)
      if(data.length) this.selectedCategory.name = data[0].name

    } else {
      this.pageTitle = "Create New Instruction"
      this.selectedCategory = this.categories[0]
    }
  }

  get title() {return this.form.get("title") as FormControl;}
  get data() {return this.form.get("data") as FormControl;}   
  
  submit() {
    this.submitting = true
    let id = this.instruction?this.instruction._id:(new Date()).getTime().toString();
    let instruction:Instruction =  {
        name:this.title.value,
        data:this.data.value,
        _id:id,
        catID:this.selectedCategory._id
    }
    this.ms.postInstruction(instruction, !this.instruction).subscribe(
      () => {
        this.submitting = false;
        this.backendError = ''
        if(!this.instruction) { this.form.reset(); }
      },
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
