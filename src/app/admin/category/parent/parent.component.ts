import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../modals/category';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import config from 'src/data/config';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  {

  config = config
  editor= ClassicEditor

  constructor(
    private route:ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }

}

