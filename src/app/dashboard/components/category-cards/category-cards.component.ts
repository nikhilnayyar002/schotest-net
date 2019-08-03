import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/dashboard/main.service';
import { GLobalState } from 'src/app/shared/global.state';
import { Store } from '@ngrx/store';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import config from 'src/data/config';
import { Category } from 'src/app/modals/category';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.scss']
})
@AutoUnsubscribe()
export class CategoryCardsComponent  {

  config = config

  @Input() categories:Category[]
  @Input() directingLink:(id:string)=>string = config.clientRoutes.dashboardCategory
  @Input() directingLabel:string = 'Visit'
  @Input() showFavourite:boolean = true
  
  syllabusHTML:string = '';
  favourites:string[]=null;

  //processing state
  settingStar = false;

  constructor(
    private ms:MainService,
    private store:Store<GLobalState>
  ) {
    this.store.select(s => s.app.user).pipe(takeWhileAlive(this))
    .subscribe(user => this.favourites = user?user.favourites:null)
  }

  isFavourite(id:string):boolean {
    return this.favourites.includes(id)
  }

  onStarClick(id:string) {
    this.settingStar = true
    let observer = {
      next: status =>  this.settingStar = false,
      error: error =>  this.settingStar = false
    } 
    if(!this.isFavourite(id)) this.ms.postFavourites(id).subscribe(observer)
    else this.ms.delFavourites(id).subscribe(observer)
  }

}








