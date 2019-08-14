import { Component, OnInit } from '@angular/core';
import { TestOriginal, TestWithFeatures } from '../modals/test';
import { Instruction } from 'src/app/modals/instruction';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import config from 'src/data/config';

@Component({
  selector: 'app-test-declaration',
  templateUrl: './test-declaration.component.html',
  styleUrls: ['./test-declaration.component.scss']
})
export class TestDeclarationComponent implements OnInit {

  configData = config;
  test:TestOriginal;
  instruction:Instruction;

  constructor(
    private route:ActivatedRoute,
    private locationStrategy:LocationStrategy,
    private router:Router
    ) {
    }

  ngOnInit() {
    if(this.route.snapshot.data.data) {
      let test= <TestWithFeatures>this.route.snapshot.data.data.test
      /** has test started */
      if(test && test.time != test.oTime) {
        this.router.navigate([ config.amplitudeTestRoutes.test(test._id)])
      }
      this.test = test;
      this.instruction = this.route.snapshot.data.data.instruction;
    }
  }


}
