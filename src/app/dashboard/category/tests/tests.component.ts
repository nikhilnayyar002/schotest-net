import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAccordianState } from 'src/app/shared/global';
import config from 'src/data/config';
import { TestWithFeatures, TestOriginal } from 'src/app/amplitude-test/modals/test';
import { MainService } from '../../main.service';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
@AutoUnsubscribe()
export class TestsComponent implements OnInit {

  config = config;
  pages: number[] = [];
  testsLimit: number = config.backend.tests.testsPerPage;

  tests:TestOriginal[];
  constructor(
    private route:ActivatedRoute,
    private ms:MainService
  ) {
  }
  onCardHeaderClick = createAccordianState()

  ngOnInit(): void {

    this.route.queryParamMap.pipe(takeWhileAlive(this)).subscribe(q => {
      this.tests = [];
      let pNo = +q.get("p");
      this.ms.getTests(
        this.route.snapshot.params.id,
        pNo ? pNo : 1
        ).subscribe(data => {
        if (data.count) {
          this.pages = [];
          let pages = Math.round(data.count / this.testsLimit);
          if (!pages) pages = 1;
          for (let i = 1; i <= pages; ++i) this.pages.push(i);
        }
        if (data.tests) this.tests = data.tests;
        else data.tests = null;
      });
    });
    
  }

}
