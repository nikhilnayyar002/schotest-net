import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page-component.modal';
import { Instruction } from 'src/app/modals/instruction';
import { Store, select } from '@ngrx/store';
import { TestState } from '../../state/test.state';
import { take } from 'rxjs/operators';
import { TestOriginal } from '../../modals/test';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent extends PageComponent {

  instruction:Instruction;
  test:TestOriginal;

  constructor(
    private store:Store<TestState>
  ) { 
    super()
    this.store.pipe(take(1),select(state=>state)).subscribe((state)=>{
      this.instruction = state.testOther.instruction
      this.test = state.test
    })
  }
  
}
