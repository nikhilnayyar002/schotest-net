import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modals/category';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
@AutoUnsubscribe()
export class ParentComponent implements OnInit {

  categories:Category[];
  areThereFavourites:boolean = true;

  constructor(
    private route:ActivatedRoute,
    private store:Store<GLobalState>
  ) {
    this.store.select(s => s.app.user).pipe(takeWhileAlive(this))
      .subscribe(user =>{
        if(!user.favourites.length)
          this.areThereFavourites = false
      })
  }

  ngOnInit(): void {
    this.categories = <Category[]> this.route.snapshot.data.categories
  }

}
