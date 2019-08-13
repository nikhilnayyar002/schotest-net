import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../../../modals/category';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import config from 'src/data/config';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  {

  config = config
  categories:Category[] = []

  constructor(
    private route:ActivatedRoute,
    private ms:MainService
  ) {}

  ngOnInit(): void {
    this.ms.getCategories().subscribe((categories)=>this.categories = categories)
  }

}

