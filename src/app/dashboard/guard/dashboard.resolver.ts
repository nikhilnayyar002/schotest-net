import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MainService } from '../main.service';
import config from 'src/data/config';

@Injectable()
export class DashboardResolverService {
  constructor(private ms:MainService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let id = route.paramMap.get("id")
    /** special because  "test result" is child of "completed"
     * also i found no way to get correct url in switch statement
     * i only know that id will be null at one time and not when "test result" 
     * will be resolved.
     * i did this because i found problem when i directly navigates
     *  toward test result before navigating to "completed"
     */
    if(state.url.includes("completed")) {
      if(!id) return this.ms.getCompletedTests()
      else return this.ms.getQuestionsAnswers(id)   
    }
    switch(state.url) {
      case config.clientRoutes.dashboardCategories() : return this.ms.getCategories()
      case config.clientRoutes.dashboardCategory(id) : return this.ms.getTests(id)
      case config.clientRoutes.dashboardPaused() : return this.ms.getPausedTests()     
      case config.clientRoutes.dashboardFavourites() : return this.ms.getFavouriteCategories()   
    } 
  }

}
