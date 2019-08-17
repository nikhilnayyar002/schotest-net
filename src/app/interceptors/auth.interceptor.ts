import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../auth.service";
import config from "src/data/config";
import {
  catchError,
  take,
  switchMap,
  switchMapTo,
  retryWhen,
  map
} from "rxjs/operators";
import { throwError, of } from "rxjs";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private store: Store<GLobalState>,
    private http: HttpClient,
    private router: Router
  ) {}

  rtnAuthReq(req: HttpRequest<any>) {
    return req.clone({
      headers: new HttpHeaders({
        "x-refresh": "true",
        Authorization: "Bearer " + this.auth.getAuthorizationToken()
      })
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let ignoreUrl = config.routes.user.authenticate();

    if (req.url != ignoreUrl) {
      req = this.rtnAuthReq(req);
      return next.handle(req).pipe(
        catchError(error => {
          if (error.error && error.status == 401) {
            return this.store
              .select(state => state.app)
              .pipe(
                take(1),
                switchMap(appState =>
                  this.auth.refreshToken(appState).pipe(
                    switchMap(() => {
                      req = this.rtnAuthReq(req);
                      return next.handle(req);
                    })
                  )
                ),
                catchError(error => {
                  if (error && error.login) {
                    /** Please relogin. This case most probably won't show up*/
                    this.router.navigate([config.clientRoutes.login()]);
                  }
                  return of(null);
                })
              );
          } //throw back
          else {
            return throwError(error)
          }
        })
      );
    } else return next.handle(req);
  }
}
