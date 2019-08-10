import { Component, OnInit } from '@angular/core';
import config from 'src/data/config';
import { ActivatedRoute } from '@angular/router';
import { TestOriginal } from 'server/src/modal/test';
import { Instruction } from 'src/app/modals/instruction';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {
  configData = config;
  test:TestOriginal;
  instruction:Instruction;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.test = this.route.snapshot.data.test
    this.instruction = this.route.snapshot.data.instruction
  }

}
