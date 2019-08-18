import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import config from 'src/data/config';
import { TestWithFeatures } from 'src/app/amplitude-test/modals/test';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent  {

  @Input() test:TestWithFeatures;
  @Input() index:number;
  @Input() accordianID:string;
  config = config;
  @Output() headClick = new EventEmitter<HTMLElement>() 

  @Input() directingLink:(id:string)=>string = config.amplitudeTestRoutes.test
  @Input() directingLabel:string;

  getSections(test:TestWithFeatures) {
    if(test.sections) return Object.keys(test.sections)
    else return null
  }
 
  onCardHeaderClick = (elem:HTMLElement) => this.headClick.emit(elem)
  // onViewResultClick = ()=> this.viewResult.emit(this.test)
}
