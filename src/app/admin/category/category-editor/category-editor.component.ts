import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MainService } from "../../main.service";
import { Category } from "src/app/modals/category";
import { ActivatedRoute, Router } from "@angular/router";
import { isValidImage, rtnInputAcceptVal } from "src/app/shared/global";
import { AutoUnsubscribe } from "take-while-alive";
import { FILELISTS } from '../../../../../global/global';

@Component({
  selector: "app-category-editor",
  templateUrl: "./category-editor.component.html",
  styleUrls: ["./category-editor.component.scss"]
})
@AutoUnsubscribe()
export class CategoryEditorComponent {

  pageTitle: string;
  configData = config;
  backendError: string;
  submitting: boolean = false;

  @ViewChild("pageContent", { static: false }) pageContent: ElementRef<HTMLElement>;

  //to work as "edit" component beside "create"
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
    private router: Router
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
    let id = this.category? this.category._id: new Date().getTime().toString();
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
          this.pageContent.nativeElement.scrollTo(0,this.pageContent.nativeElement.scrollHeight);
        }, 0);
      }
    );
  }
  remove() {
    let t = window.confirm("Is it OK?");
    if (t) {
      this.submitting = true;
      this.ms.delCategory(this.category._id).subscribe(
        () => {
          this.submitting = false;
          this.router.navigate([config.adminRoutes.adminCategories()]);
        },
        () => (this.submitting = false)
      );
    }
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
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  // ******************************* Image upload workstation here

  /** value for accept attribute of input */
  imageAccept: string = rtnInputAcceptVal(FILELISTS.image, "image");
  /** variables */
  imageError: string = null;
  imageProcessing: boolean = false;

  encodeImage(element) {
    this.imageProcessing = true;
    let file: File = element.target.files[0];
    if (!isValidImage(file)) {
      this.imageError = "Invalid image provided. File Proccessing Failed.";
      element.target.value = "";
      this.imageProcessing = false;
    } else {
      let fileName = `cat_${new Date().getTime()}.${file.type.split("/")[1]}`;
      /** uploading image file */
      let formData: FormData = new FormData();
      formData.append("image", file, file.name);
      this.ms.postImage(formData, fileName).subscribe(
        () => {
          this.imageError = null;
          element.target.value = "";
          this.image.setValue(`${config.globalConfig.imageRequestUrl}/${fileName}`);
          this.imageProcessing = false;
        },
        error => {
          let m = error.error.message;
          this.imageError = m ? m : "Image save failure. Backend error.";
          this.imageProcessing = false;
        }
      );
    }
  }

  removeImage() {
    this.imageProcessing = false;
    this.ms
      .delImage(
        (<string>this.image.value).replace(config.globalConfig.imageRequestUrl,"")
      )
      .subscribe(
        () => {
          this.imageError = "";
          this.imageProcessing = false;
          this.image.setValue("");
        },
        error => {
          let m = error.error.message;
          this.imageError = m ? m : "Image save failure. Backend error.";
          this.imageProcessing = false;
        }
      );
  }
}
