import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { take } from "rxjs/operators";
import { SetRedirectURL } from "../state/state.actions";
import config from 'src/data/config';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private store: Store<GLobalState>,
    private auth:AuthService
    ) {}
  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): any {
    return new Observable(subscriber => {
      this.store
        .select(state => state.app.loggedIn)
        .pipe(take(1))
        .subscribe(state => {
          if (!state) {
            this.auth.lastUrlLoaded = routerState.url
            this.router.navigate([config.clientRoutes.login()], {skipLocationChange:true});
          }
          subscriber.next(state);
        });
    });

    //   if(this.auth.init) {
    //     if(!this.auth.status) {
    //       const tree: UrlTree =this.router.parseUrl('/home');
    //       return tree;
    //     }
    // 	  return true;
    //   }
    //   else {
    //    return this.auth.status$;
    //   }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
