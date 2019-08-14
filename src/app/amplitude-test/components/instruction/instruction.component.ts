import { Component, OnInit, Input } from '@angular/core';
import { TestOriginal } from '../../modals/test';
import { Instruction } from 'src/app/modals/instruction';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  @Input() test:TestOriginal;
  @Input() instruction:Instruction;
  constructor() { }

  ngOnInit() {
  }

}
