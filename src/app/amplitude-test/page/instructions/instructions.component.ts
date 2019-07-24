import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent extends PageComponent {

  constructor() { 
    super();
  }


}
