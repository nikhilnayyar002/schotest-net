import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestOriginal } from 'src/app/amplitude-test/modals/test';
import { Validators, FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import config from 'src/data/config';

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

  form = this.fb.group({
    title: ["", [Validators.required]],
    detail: [""],
    time:[0, [Validators.pattern('^[0-9]+$')]],
    nOfQ:[0, [Validators.pattern('^[0-9]+$')]],
    marks:[0, [Validators.pattern('^[0-9]+$')]],
    isTestReady:[false],
    sections:this.fb.array([]),

    sectionOrder:[null, [Validators.pattern('^[0-9]+$')]],
    sectionName: ["", [Validators.required]]
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
      this.nOfQ.setValue(this.test.nOfQ)
      this.marks.setValue(this.test.marks)
      this.isTestReady.setValue(this.test.isTestReady)

    //we need to create "sections":
    //  sections: { [index: string]: { qID:string, sectionOrder:number } };
    //and we have {sectionOrder: string, name: string, qID:string}      
      for(let prop in this.test.sections) 
        this.sections.push(this.fb.group({
          name: [prop], /** unactive control */
          sectionOrder:[this.test.sections[prop].sectionOrder, [Validators.pattern('^[0-9]+$')]],
          qID:[this.test.sections[prop].qID] /** hidden control */
        }))

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
  get sections() {return this.form.get("sections") as FormArray;}

  get sectionOrder() {return this.form.get("sectionOrder") as FormControl;}
  get sectionName() {return this.form.get("sectionName") as FormControl;}
  removeSection(index:number) {
    this.sections.removeAt(index)
  }

  addSection() {
    //"section already Added !!"
    for(let i of this.sections.controls)
      if(i.value.name == this.sectionName.value)
        return;
    this.sections.push(this.fb.group({
      name: [this.sectionName.value], /** unactive control */
      sectionOrder:[this.sectionOrder.value, [Validators.pattern('^[0-9]+$')]],
      qID:[null] /** hidden control */
    }))
    this.sectionOrder.reset(); this.sectionName.reset();
  }


  submit() {
    this.submitting = true
    let id = this.test?this.test._id:(new Date()).getTime().toString();

    //we need to create "sections":
    //  sections: { [index: string]: { qID:string, sectionOrder:number } };
    //and we have {sectionOrder: string, name: string, qID:string}
    let sections = {}
    for(let i of this.sections.controls) {
      let index = i.value.name, sectionOrder = i.value.sectionOrder, qID = i.value.qID
      sections[index] = {qID, sectionOrder:sectionOrder?+sectionOrder:null}
    }

    let test:TestOriginal =  {
        name:this.title.value,
        sections:sections,
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
