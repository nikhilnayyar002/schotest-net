import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MainService } from "../../main.service";
import { Category } from "src/app/modals/category";
import { ActivatedRoute, Router } from "@angular/router";
import { encodeImageToUrl, FILES } from 'src/app/shared/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';

@Component({
  selector: "app-category-editor",
  templateUrl: "./category-editor.component.html",
  styleUrls: ["./category-editor.component.scss"]
})
export class CategoryEditorComponent {
  pageTitle: string;
  configData = config;
  backendError: string;
  submitting: boolean = false;

  @ViewChild("pageContent", { static: false }) pageContent: ElementRef<
    HTMLElement
  >;

  //work as "edit" component
  category: Category;

  form = this.fb.group({
    title: ["", [Validators.required]],
    syllabus: [""],
    image: [""]
  });

  constructor(
    private fb: FormBuilder,
    private ms: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data["category"];
    /** Display the values */
    if (this.category) {
      this.pageTitle = "Edit " + this.category.name;

      this.title.setValue(this.category.name);
      this.image.setValue(this.category.image);
      this.syllabus.setValue(this.category.syllabus);
    } else {
      this.pageTitle = "Create New Category";
    }
  }

  get title() {
    return this.form.get("title") as FormControl;
  }
  get image() {
    return this.form.get("image") as FormControl;
  }
  get syllabus() {
    return this.form.get("syllabus") as FormControl;
  }

  submit() {
    this.submitting = true;
    let id = this.category
      ? this.category._id
      : new Date().getTime().toString();
    let category: Category = {
      name: this.title.value,
      lastUpdated: new Date(),
      _id: id,
      syllabus: this.syllabus.value,
      image: this.image.value
    };

    this.ms.postCategory(category, !this.category).subscribe(
      () => {
        this.submitting = false;
        this.backendError = "";
        if (!this.category) this.form.reset();
      },
      (error: any) => {
        this.submitting = false;
        this.backendError = "";
        this.backendError = error.error.message;
        setTimeout(() => {
          this.pageContent.nativeElement.scrollTo(
            0,
            this.pageContent.nativeElement.scrollHeight
          );
        }, 0);
      }
    );
  }
  remove() {
    this.submitting = true;
    this.ms.delCategory(this.category._id).subscribe(
      () => {
        this.submitting = false;
        this.router.navigate([config.adminRoutes.adminCategories()]);
      },
      () => (this.submitting = false)
    );
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

  /**
   * 
   * Image upload workstation here
   * 
   * */

  imageAccept:string = (function(){
    "image/png, image/jpeg"
    let accept = ''
    FILES.image.forEach(t => accept+=`image/${t}, `)
    accept = accept?accept.slice(0,accept.length - 2):"image/*"
    return accept
  }())

  imageError:string = null
  imageURL:string = ''

  encodeImage(element) {

    let file = element.target.files[0];
    if (file) {
      let reader: FileReader = encodeImageToUrl.bind(this)(file);
      if (!reader) {
        this.imageError = "Invalid image provided. File Proccessing Failed."
        element.target.value = ""
      } else
        reader.onloadend = () => {
          this.imageError = null
          element.target.value = ""
          this.imageURL = <string>(reader.result)

          let formData:FormData = new FormData();
          formData.append('image', file, file.name);
          this.ms.postImage(formData).subscribe()
        
        };
    }
  }
}
