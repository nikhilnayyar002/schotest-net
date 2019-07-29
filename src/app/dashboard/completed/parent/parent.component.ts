import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import { TestResponse } from 'src/app/amplitude-test/modals/test';
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

  tests:TestResponse[];
  sections:string[];
  
  onCardHeaderClick = createAccordianState();
  onViewResultClick = (test:TestResponse)=> this.ps.currentSelectedTest = test
    

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

  getSections(test:TestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }


}
