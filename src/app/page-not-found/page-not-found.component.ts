import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import config from 'src/data/config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  config = config
  constructor(
    private auth:AuthService,
    private route:ActivatedRoute
  ) {
  }

}
