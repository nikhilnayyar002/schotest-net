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

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let ignoreUrl = config.routes.user.authenticate();
    let noOfTries = 1;

    if (req.url != ignoreUrl) {
      req = req.clone({
        headers: new HttpHeaders({
          "x-refresh": "true",
          Authorization: "Bearer " + this.auth.getAuthorizationToken()
        })
      });

      return next.handle(req).pipe(
        retryWhen(errors =>
          errors.pipe(
            switchMap(error => {
              if (error.error && error.status == 401 && noOfTries) {
                noOfTries -= 1;
                return this.store
                  .select(state => state.app)
                  .pipe(
                    take(1),
                    switchMap(appState =>
                      this.auth.refreshToken(appState).pipe(
                        map(() => {
                          req = req.clone({
                            headers: new HttpHeaders({
                              "x-refresh": "true",
                              Authorization:
                                "Bearer " + this.auth.getAuthorizationToken()
                            })
                          });
                          return true;
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
              } else {
                //break out of retry
                return throwError(error);
              }
            })
          )
        )
        // catchError(()=> of(null))
      );
    }
    else return next.handle(req)
  }
}

/**
 * actually it should be "Refresh token if necessary"
 */
// tryWithRefreshIfNecc(url, recipe) {
//   return this.http.get(url)
//     .pipe(
//       recipe,
//       catchError((error) =>
// {        console.log(error)
//  return  this.store.select(state=> state.app).pipe(
//           take(1),
//           switchMap(appState => {
//             /**
//              * Refresh token and use original recipe
//              */
//             return this.refreshToken(appState).pipe(
//               switchMapTo(this.http.get(url).pipe(recipe))
//             )
//             /**end  */
//           }),
//           catchError(()=> of(null))
//         )}
//       )
//     )
// }
