import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { take, switchMap, map, retry, catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { BackendStatus } from "../shared/global";
import { SetAppState } from "../state/state.actions";
import { of, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginResolverService {
  constructor(private store: Store<GLobalState>, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store
      .select(state => state.app)
      .pipe(
        take(1),
        switchMap(appState => {

          if (appState.loggedIn) return of(true);

          /* if false means token expired */
          else if (this.auth.isUserPayloadValid())
            /**
             * token is not expired use it.
             */
            return this.auth.userProfileHandled().pipe(
              map((status: BackendStatus) => {
                this.store.dispatch(
                  SetAppState({
                    app: {
                      user: status.user,
                      loggedIn: status.status
                    }
                  })
                );
                return true;
              }),
              catchError(()=> of(false))
            );
          /**
           * Refresh token and log in if password is there
           */
          else 
            return this.auth.refreshToken(appState).pipe(
              catchError(()=> of(false))
            )
        })
      );
  }
}
