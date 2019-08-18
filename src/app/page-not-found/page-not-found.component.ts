import { Component, OnInit } from '@angular/core';
import config from 'src/data/config';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  config = config
}
