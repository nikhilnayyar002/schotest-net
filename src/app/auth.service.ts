import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, mapTo, switchMap, switchMapTo } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { BackendStatus, Credentials } from './shared/global';



@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  authenticate(email: string, pass: string): Observable<BackendStatus | Error> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let url = "http://localhost:3000/auth/authenticate";
    let credentials: Credentials = {
      email,
      password: pass
    };

    return this.http
      .post<BackendStatus>(url, credentials, httpOptions)
      .pipe(
        /**
         * Set the token in localstorage
         */
        switchMap( (status)=> {
          localStorage.setItem('token', status.token)
          return this.userProfile()
        }),
        catchError(this.handleError)
      );
  }


  // function isUserPayloadValid() {
  //     let token = localStorage.getItem('token');
  //     if (token) {
  //         var userPayload = atob(token.split('.')[1]);
  //         userPayload=JSON.parse(userPayload);
  //         if (userPayload && (userPayload.exp > Date.now() / 1000))
  //         return true;
  //     }
  //     return false;
  // }

  userProfile(): Observable<BackendStatus | Error> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
     })
    };

    let url = "http://localhost:3000/auth/userProfile";
    return this.http.get<BackendStatus>(url, httpOptions);
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
      error.error?error.error.message:"Something bad happened. Please try again."
    );
  }

  isUserPayloadValid() {
    let token = localStorage.getItem('token');
    if (token) {
        var userPayload:any = atob(token.split('.')[1]);
        userPayload=JSON.parse(userPayload);
        if (userPayload && (userPayload.exp > Date.now() / 1000))
        return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

}
