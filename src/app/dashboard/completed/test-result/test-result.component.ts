import { Component, OnInit } from "@angular/core";
import { ParentService } from "../parent.service";
import { TestWithFeatures, UserTest } from "src/app/amplitude-test/modals/test";
import { QuestionsAnswers } from "src/app/shared/global";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-test-result",
  templateUrl: "./test-result.component.html",
  styleUrls: ["./test-result.component.scss"]
})
export class TestResultComponent {

  test: TestWithFeatures;
  res: { userTest: UserTest; questionsAnswers: QuestionsAnswers; };
  selectedOption: "overall" | "q&a" = "overall";

  constructor(private ps: ParentService, private route: ActivatedRoute){

  }


  ngAfterViewInit(): void {
    /**
     *  ngAfterViewInit() is perfect choice when data is loaded through service from
     *  parent component into the child
     * 
     *  Wait 1 tick for to prevent ExpressionChangedAfterItHasBeenCheckedError
     * 
     * */
    setTimeout(() => {
        //resolved response
    this.res = this.route.snapshot.data.questionsAnswers
    if(!this.res) return
    
    //test received from Parent Component through ParentService
    let t = this.ps.tests.filter(test => test._id == this.route.snapshot.paramMap.get('id'))
    if(!t.length) return

    //set test
    this.test = t[0]

    }, 0);
  }



}
