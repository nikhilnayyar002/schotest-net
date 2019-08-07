import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestOriginal } from 'src/app/amplitude-test/modals/test';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import config from 'src/data/config';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.scss']
})
export class TestEditorComponent implements OnInit {

  pageTitle:string;
  configData = config;
  backendError: string;
  submitting: boolean = false;
  @ViewChild("pageContent", {static:false}) pageContent:ElementRef<HTMLElement>;

  //work as "edit" component
  test:TestOriginal;

  //new
  questions:QuestionOriginal[]=[]

  form = this.fb.group({
    title: ["", [Validators.required]],
    detail: [""],
    time:[0, [Validators.pattern('^[0-9]+$')]],
    nOfQ:[0, [Validators.pattern('^[0-9]+$')]],
    marks:[0, [Validators.pattern('^[0-9]+$')]],
    isTestReady:[false]
  });

  constructor(private fb: FormBuilder, private ms:MainService, private route: ActivatedRoute)
  {}


  ngOnInit(): void {
    this.test = this.route.snapshot.data["test"]
    /** Display the values */
    if(this.test) {
      this.pageTitle = "Edit "+ this.test.name
      this.title.setValue(this.test.name)
      this.detail.setValue(this.test.detail)
      this.time.setValue(this.test.oTime)
    } else {
      this.pageTitle = "Create New Test"
    }

  }

  get title() {return this.form.get("title") as FormControl;}
  get detail() {return this.form.get("detail") as FormControl;}  
  get time() {return this.form.get("time") as FormControl;} 
  get isTestReady() {return this.form.get("isTestReady") as FormControl;} 
  get nOfQ() {return this.form.get("nOfQ") as FormControl;} 
  get marks() {return this.form.get("marks") as FormControl;} 

  submit() {
    this.submitting = true
    let id = this.test?this.test._id:(new Date()).getTime().toString();
    let test:TestOriginal =  {
        name:this.title.value,
        sections:null,
        detail:this.detail.value,
        oTime:this.time.value?this.time.value:0,
        _id:id,
        nOfQ:this.nOfQ.value?this.nOfQ.value:0,
        marks:this.marks.value?this.marks.value:0,
        isTestReady:this.isTestReady.value
    }
    this.ms.postTest(test, !this.test).subscribe(
      () => {
        this.submitting = false;
        if(!this.test) { this.form.reset();}
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


}
