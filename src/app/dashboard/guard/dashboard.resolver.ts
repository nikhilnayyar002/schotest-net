import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DashboardModule } from '../dashboard.module';
import { MainService } from '../main.service';
import config from 'src/data/config';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardResolverService {
  constructor(private ms:MainService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let catID = route.paramMap.get("id")
    switch(state.url) {
      case config.clientRoutes.dashboardCategories() : return this.ms.getCategories()
      case config.clientRoutes.dashboardCategory(catID) : return this.ms.getTests(catID)
      case config.clientRoutes.dashboardPaused() : return this.ms.getPausedTests()    
      case config.clientRoutes.dashboardCompleted() : return this.ms.getCompletedTests()     
    } 
  }

}
