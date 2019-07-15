import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modals/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$:Observable<Category[]>

  constructor(
    private ms:MainService
  ) {
    this.categories$ = ms.getCategories()
  }

  ngOnInit() {
    
  }

}
