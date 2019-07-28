import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {
  catchError,
  switchMap,
  switchMapTo,
  take,
  map,
  retry
} from "rxjs/operators";
import { Observable, throwError, of, pipe } from "rxjs";
import { BackendStatus, Credentials } from "./shared/global";
import { Store } from "@ngrx/store";
import { GLobalState } from "./shared/global.state";
import { SetAppState } from "./state/state.actions";
import { AppState } from "./state/app.state";
import config from 'src/data/config';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<GLobalState>) {}

  lastUrlLoaded:string=config.clientRoutes.dashboard()

  authenticate(email: string, pass: string): Observable<BackendStatus | Error> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let credentials: Credentials = {
      email,
      password: pass
    };
    return this.http.post<BackendStatus>(config.routes.user.authenticate(), credentials, httpOptions).pipe(
      /**
       * Set the token in localstorage
       */
      switchMap(status => {
        localStorage.setItem("token", status.token);
        return this.userProfile();
      }),
      catchError(this.handleError)
    );
  }

  userProfile(): Observable<BackendStatus | Error> {
    return this.http.get<BackendStatus>(config.routes.user.userProfile());
  }

  userProfileHandled() {
    return this.userProfile().pipe(catchError(this.handleError));
  }

  /**
   *
   * @param error
   *  if error is from backend then
   *    error.error will give more details.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
          `Message: ${error.statusText}`
      );
    }

    // return an observable with a user-facing error message
    return throwError(
      error.error
        ? error.error.message
        : "Something bad happened. Please try again."
    );
  }

  isUserPayloadValid() {
    let token = localStorage.getItem("token");
    if (token) {
      var userPayload: any = atob(token.split(".")[1]);
      userPayload = JSON.parse(userPayload);
      if (userPayload && userPayload.exp > Date.now() / 1000) return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
  }

  getAuthorizationToken() {
    return localStorage.getItem("token");
  }

  refreshToken(appState: AppState,) {

    if (appState.cred && appState.loggedIn)
      return this.authenticate(
        appState.cred.email,
        appState.cred.password
      ).pipe(
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
        retry(1)
      );
    else return throwError("Please re-login");
  }
  
/**
 * actually it should be "Refresh token if necessary"
 */
  tryWithRefreshIfNecc(url, recipe) {
    return this.http.get(url)
      .pipe(
        recipe,
        catchError(() => 
          this.store.select(state=> state.app).pipe(
            take(1),
            switchMap(appState => {
              /**
               * Refresh token and use original recipe
               */
              return this.refreshToken(appState).pipe(
                switchMapTo(this.http.get(url).pipe(recipe))
              )
              /**end  */
            }),
            catchError(()=> of(null))
          )
        )
      )
  }









}
