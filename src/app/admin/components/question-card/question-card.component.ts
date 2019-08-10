import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionOriginal } from 'src/app/amplitude-test/modals/question';
import config from 'src/data/config';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent  {


  @Input() question:QuestionOriginal;
  @Input() index:number;
  @Input() accordianID:string;
  config = config;
  @Output() headClick = new EventEmitter<HTMLElement>() 
  @Output() editCLick = new EventEmitter<boolean>() 

  onCardHeaderClick = (elem:HTMLElement) => this.headClick.emit(elem)
  onEditClick = () => this.editCLick.emit(true)
}
