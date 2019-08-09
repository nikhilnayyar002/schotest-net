import { Component, OnInit } from '@angular/core';
import config from 'src/data/config';
import { MainService } from '../../main.service';
import { Instruction } from 'src/app/modals/instruction';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  config = config
  instructions:Instruction[]

  constructor(
    // private route:ActivatedRoute,
    private ms:MainService
  ) {}

  ngOnInit(): void {
    this.ms.getInstructionStates().subscribe((instructions)=>this.instructions = instructions)
  }

}
