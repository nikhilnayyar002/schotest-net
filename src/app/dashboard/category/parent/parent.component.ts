import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../modals/category';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  {

  categories$:Observable<Category[]>

  constructor(
    private ms:MainService
  ) {
    this.categories$ = ms.getCategories()
  }

}

