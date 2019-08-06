import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import config from 'src/data/config';
import { TestWithFeatures } from 'src/app/amplitude-test/modals/test';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  config = config
  tests:TestWithFeatures[];
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
