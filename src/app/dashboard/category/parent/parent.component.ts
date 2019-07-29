import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../modals/category';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  {

  categories:Category[]

  constructor(
    private route:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.categories = <Category[]> this.route.snapshot.data.categories
  }

}

