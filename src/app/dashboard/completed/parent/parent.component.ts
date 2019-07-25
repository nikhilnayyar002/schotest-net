import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { BackendTestResponse } from 'src/app/amplitude-test/modals/test';
import { createAccordianState } from 'src/app/shared/global';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(
    private route:ActivatedRoute
  ) { }

  tests:BackendTestResponse[];
  sections:string[];

  onCardHeaderCLick = createAccordianState();

  ngOnInit(): void {
    this.tests = <any[]> this.route.snapshot.data.tests
  }

  getSections(test:BackendTestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }


}
