import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import { TestResponse } from 'src/app/amplitude-test/modals/test';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(
    private route:ActivatedRoute
  ) { }

  tests:TestResponse[];
  sections:string[];

  onCardHeaderCLick = createAccordianState();

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

  getSections(test:TestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }

}
