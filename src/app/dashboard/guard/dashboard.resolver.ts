import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DashboardModule } from '../dashboard.module';
import { MainService } from '../main.service';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardResolverService {
  constructor(private ms:MainService) {
      console.log("DashboardResolverService created")
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let catID = route.paramMap.get("id")
    switch(state.url) {
      case "/dashboard/category" : return this.ms.getCategories()
      case `/dashboard/category/${catID}` : return this.ms.getTests(catID)
    } 
  }

}
