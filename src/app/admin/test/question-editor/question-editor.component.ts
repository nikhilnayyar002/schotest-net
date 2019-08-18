import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { QuestionOriginal } from "src/app/amplitude-test/modals/question";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { MainService } from "../../main.service";
import config from "src/data/config";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { rtnInputAcceptVal, isValidImage } from "src/app/shared/global";
import {FILELISTS} from "../../../../../global/global"

@Component({
  selector: "app-question-editor",
  templateUrl: "./question-editor.component.html",
  styleUrls: ["./question-editor.component.scss"]
})
export class QuestionEditorComponent implements OnInit {
  pageTitle: string;
  configData = config;
  backendError: string;
  submitting: boolean = false;

  @ViewChild("pageContent", { static: false }) pageContent: ElementRef<HTMLElement>;

  //work as "edit" component
  @Input() question: QuestionOriginal;
  @Input() qNo: number = 0;
  @Input() displayHeader: boolean = true;
  @Input() saveMode: boolean = false;
  @Input() testID: string;
  @Output() savedQuestion = new EventEmitter<QuestionOriginal>();
  @Output() closeForm = new EventEmitter<boolean>();

  @Input() sections: { sectionOrder: number; name: string }[] = [];
  selectedSection: { sectionOrder: number; name: string } = <any>{};

  form = this.fb.group({
    content: [""],
    image: [""],
    isComprehension: [false],
    comprehensionContent: [""],
    marks: [0, [Validators.pattern("^[0-9]+$")]],
    answers: this.fb.array([]),

    answer: [""]
  });

  constructor(private fb: FormBuilder, private ms: MainService) {}

  ngOnInit(): void {
    /** Display the values */
    if (this.question) {
      this.pageTitle = "Edit Question No." + this.qNo;

      this.content.setValue(this.question.content);
      this.image.setValue(this.question.image);
      this.isComprehension.setValue(this.question.isComprehension);
      this.comprehensionContent.setValue(this.question.comprehensionContent);
      this.selectedSection.name = this.question.section;
      this.selectedSection.sectionOrder = this.question.sectionOrder;
      this.marks.setValue(this.question.marks);
      for (let answer of this.question.answers)
        this.answers.push(this.fb.control(answer, Validators.required));
    } else {
      this.pageTitle = "Create New Question";
    }
  }

  get comprehensionContent() {
    return this.form.get("comprehensionContent") as FormControl;
  }
  get isComprehension() {
    return this.form.get("isComprehension") as FormControl;
  }
  get content() {
    return this.form.get("content") as FormControl;
  }
  get image() {
    return this.form.get("image") as FormControl;
  }
  get marks() {
    return this.form.get("marks") as FormControl;
  }
  get answer() {
    return this.form.get("answer") as FormControl;
  }
  get answers() {
    return this.form.get("answers") as FormArray;
  }

  removeAnswer(index: number) {
    let t = window.confirm("Is it OK?");
    if (t) this.answers.removeAt(index);
  }

  addAnswer() {
    //"section already Added !!"
    for (let i of this.answers.controls)
      if (i.value == this.answer.value) return;
    this.answers.push(this.fb.control(this.answer.value, Validators.required));
    this.answer.reset();
  }

  submit() {
    this.submitting = true;
    let id = this.question? this.question._id: new Date().getTime().toString();

    let question: QuestionOriginal = {
      content: this.content.value,
      image: this.image.value,
      isComprehension: this.isComprehension.value,
      comprehensionContent: this.comprehensionContent.value,
      answers: this.answers.controls.map(ctrl => ctrl.value),
      _id: id,
      section: this.selectedSection ? this.selectedSection.name : null,
      marks: this.marks.value,
      sectionOrder: this.selectedSection? this.selectedSection.sectionOrder: null,
      tID: this.testID
    };

    if (this.saveMode) {
      this.savedQuestion.emit(question);
      this.submitting = false;
      return;
    }

    this.ms.postQuestion(question, !this.question).subscribe(
      () => {
        this.submitting = false;
        this.backendError = "";
        this.closeForm.emit(true);
      },
      (error: any) => {
        this.submitting = false;
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
      this.ms.delQuestion(this.question._id).subscribe(
        () => {
          this.submitting = false;
          this.closeForm.emit(true);
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
    // console.log(Array.from( editor.ui.componentFactory.names() ))
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  /** value for accept attribute of input */
  imageAccept: string = rtnInputAcceptVal(FILELISTS.image, "image");
  /** IMp */
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
      let fileName = `que_${new Date().getTime()}.${file.type.split("/")[1]}`;
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
