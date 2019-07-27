import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import { TestResponse } from 'src/app/amplitude-test/modals/test';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:TestResponse[];
  sections:string[];
  constructor(
    private route:ActivatedRoute
  ) {
  }

  onCardHeaderCLick = createAccordianState();

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

  getSections(test:TestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }

}
