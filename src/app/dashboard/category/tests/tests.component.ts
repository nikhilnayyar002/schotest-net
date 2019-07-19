import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/amplitude-test/modals/test';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  tests:Test[];

  constructor(
    private route:ActivatedRoute
  ) {
  }

  onCardHeaderCLick(elem:HTMLElement) {
    let ct = <HTMLElement> elem.querySelector(".card-status-container")
    if(ct.style.transform == "rotate(90deg)")
      ct.style.transform = "rotate(-90deg)"
    else
      ct.style.transform = "rotate(90deg)"
  }

  ngOnInit(): void {
    this.tests = <Test[]> this.route.snapshot.data.tests
  }

}
