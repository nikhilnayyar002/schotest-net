import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MainService } from '../main.service';
import config from 'src/data/config';
import { TestEditorComponent } from '../test/test-editor/test-editor.component';

@Injectable()
export class AdminResolverService {

  constructor(private ms:MainService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let id = route.paramMap.get("id")
    /** special because  "test result" is child of "completed"
     * also i found no way to get correct url in switch statement
     * i only know that id will be null at one time and not when "test result" 
     * will be resolved.
     * i did this because i found problem when i directly navigates
     *  toward test result before navigating to "completed"
     */

    if(state.url.includes(config.adminRoutes.adminTestEdit())) {
      if (route.component == TestEditorComponent) return this.ms.getTest(id)
      if(state.url.includes("questions")) return
    }

    switch(state.url) {
        case config.adminRoutes.adminEditCategory(id) : return this.ms.getCategory(id)
        case config.adminRoutes.adminEditInstruction(id) : return this.ms.getInstruction(id)
        case config.adminRoutes.testCreate() : return this.ms.getCategoryStates()
        // case config.adminRoutes.adminEditTest(id) : return this.ms.getTest(id)
    //   case config.clientRoutes.dashboardCategory(id) : return this.ms.getTests(id)
    //   case config.clientRoutes.dashboardPaused() : return this.ms.getPausedTests()     
    //   case config.clientRoutes.dashboardFavourites() : return this.ms.getFavouriteCategories()   
    } 
  }

}
