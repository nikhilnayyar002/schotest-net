import { Component, OnInit } from "@angular/core";
import config from "src/data/config";
import { TestOriginal } from "src/app/amplitude-test/modals/test";
import { ActivatedRoute } from "@angular/router";
import { MainService } from "../../main.service";
import { takeWhileAlive, AutoUnsubscribe } from "take-while-alive";
import { createAccordianState } from "src/app/shared/global";
import { Subject, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
@AutoUnsubscribe()
export class ParentComponent implements OnInit {
  config = config;
  pages: number[] = [];
  testsLimit: number = config.backend.tests.testsPerPage;

  tests: TestOriginal[] = [];

  constructor(private ms: MainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeWhileAlive(this)).subscribe(q => {
      this.tests = [];
      let pNo = +q.get("p");
      this.ms.getTests(pNo ? pNo : 1).subscribe(data => {
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


    /** Search Feature */
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchTests(term))
    );
    /** */
  }

  /** Search Feature */
  onCardHeaderClick = createAccordianState();
  searchResults$: Observable<TestOriginal[]>;

  private searchTerms = new Subject<string>();
  search(term: string): void {
    this.searchTerms.next(term);
  }
  searchTests(term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return of([]);
  }
  /** */
}
