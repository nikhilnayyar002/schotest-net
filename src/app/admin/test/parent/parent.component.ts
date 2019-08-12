import { Component, OnInit } from '@angular/core';
import config from 'src/data/config';
import { TestOriginal } from 'src/app/amplitude-test/modals/test';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { createAccordianState } from 'src/app/shared/global';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
@AutoUnsubscribe()
export class ParentComponent implements OnInit {

  config = config
  pages:number[] = [];

  tests:TestOriginal[] =[];

  constructor(
    private ms:MainService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParamMap.pipe(takeWhileAlive(this)).subscribe((q)=>{
      let pNo = +q.get("pNo")
      this.ms.getTests(pNo?pNo:1).subscribe((data)=>{
        if(data.count) {
          this.pages = []
          let pages = Math.round(data.count/10);
          if(!pages) pages = 1
          for(let i=1;i<=pages;++i) this.pages.push(i)
        }
        if(data.tests) this.tests = data.tests
        else data.tests = null
      })
    })

  }

  onCardHeaderClick = createAccordianState()

}
