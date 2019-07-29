import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TestResponse } from 'src/app/amplitude-test/modals/test';
import config from 'src/data/config';
import { createAccordianState } from 'src/app/shared/global';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent  {

  @Input() test:TestResponse;
  @Input() index:number;
  @Input() accordianID:string;
  config = config;
  @Output() headClick = new EventEmitter<HTMLElement>() 
  @Output() viewResult = new EventEmitter<TestResponse>() 


 
  getSections(test:TestResponse) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }
 
  onCardHeaderClick = (elem:HTMLElement) => this.headClick.emit(elem)
  onViewResultClick = ()=> this.viewResult.emit(this.test)
}
