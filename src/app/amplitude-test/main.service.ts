import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Test } from './modals/test';
import config from '../../data/config';
import { QuestionStateDB } from './shared/indexDB';
import { Store } from '@ngrx/store';
import { GLobalState } from '../shared/global.state';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
    private store:Store<GLobalState>
    ) { }

  /**
   * Fetches questions and sets the questions array locally
   */
  getTest(id:string): Observable<Test> {

    let url=`${config.api.base}/tests/${id}`
    return this.http.get(url)
      .pipe(
        map((data: {status:boolean; test:Test; }) => data.test),
        tap((test)=>{
          QuestionStateDB.testID=test._id
          QuestionStateDB.setup(test.questions)
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Fetches questions and sets the questions array locally
   */
  getUserTest(uid:string,id:string): Observable<Test> {
    let url=`${config.api.base}/userData/${uid}/tests/${id}`
    return this.http.get(url)
      .pipe(
         map((data: {status:boolean; test:Test; }) => data.test),
         catchError(this.handleError)
      )
  } 

  updateQuestion(uid:string, tid: string, qid:string, ans:string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let data = { id:tid, question:{}}
    data.question[qid] = ans
    
    let url=`${config.api.base}/userData/${uid}/tests/q`
    return this.http.post( url, data,  httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTime(uid:string, tid: string, time:number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let data = { id:tid, time}
    let url=`${config.api.base}/userData/${uid}/tests/t`
    return this.http.post( url, data,  httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `Message: ${error.statusText}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try reloading the page');
  };

}
