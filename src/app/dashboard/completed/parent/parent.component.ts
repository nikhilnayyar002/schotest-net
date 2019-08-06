import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import { TestWithFeatures } from 'src/app/amplitude-test/modals/test';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  providers: [ParentService]
})
export class ParentComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private ps:ParentService
  ) { }

  tests:TestWithFeatures[];
  sections:string[];
  
  onCardHeaderClick = createAccordianState();

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
    this.ps.tests = this.tests
  }

  getSections(test:TestWithFeatures) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }


}
