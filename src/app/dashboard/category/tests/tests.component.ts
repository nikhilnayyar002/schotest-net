import { Component, OnInit } from '@angular/core';
import { BackendTestResponse } from 'src/app/amplitude-test/modals/test';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:BackendTestResponse[];
  sections:string[];
  constructor(
    private route:ActivatedRoute
  ) {
  }

  onCardHeaderCLick = createAccordianState();

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

  getSections(test:BackendTestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }

}
