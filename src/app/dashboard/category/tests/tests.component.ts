import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import { TestResponse } from 'src/app/amplitude-test/modals/test';
import config from 'src/data/config';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  config = config
  tests:TestResponse[];
  sections:string[];
  constructor(
    private route:ActivatedRoute
  ) {
  }
  onCardHeaderClick = createAccordianState()

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

}
