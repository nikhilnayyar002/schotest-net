import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MainService } from '../main.service';
import config from 'src/data/config';

@Injectable()
export class AdminResolverService {

  constructor(private ms:MainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let id = route.paramMap.get("id")

    switch(state.url) {
    //   case config.clientRoutes.dashboardCategory(id) : return this.ms.getTests(id)
    //   case config.clientRoutes.dashboardPaused() : return this.ms.getPausedTests()     
    //   case config.clientRoutes.dashboardFavourites() : return this.ms.getFavouriteCategories()   
    } 
  }

}
