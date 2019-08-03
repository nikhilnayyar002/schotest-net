import { Component, OnInit } from '@angular/core';
import config from 'src/data/config';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  config = config
  // categories:Category[]

  constructor(
    // private route:ActivatedRoute,
    // private ms:MainService
  ) {}

  ngOnInit(): void {
    // this.ms.getCategories().subscribe((categories)=>this.categories = categories)
  }

}
