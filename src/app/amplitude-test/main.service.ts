import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Question } from './modals/question';
import { catchError, tap, map } from 'rxjs/operators';
import { Test } from './modals/test';
import config from '../../data/config';
import { QuestionStateDB } from './shared/indexDB';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  /**
   * Fetches questions and sets the questions array locally
   */
  getTest(id:number): Observable<Test> {

    let url=`${config.api.base}/tests/${id}`
    return this.http.get(url)
      .pipe(
        map((data:any)=>{
          data.id=data._id
          data.questions.map((question)=>{
            question.id=question._id
            return question as Question
          })
          return data as Test
        }),
        tap((test)=>{
          QuestionStateDB.testID=test.id
          QuestionStateDB.setup(test.questions)
        }),
        catchError(this.handleError)
      )
  }

  updateQuestion(testID:number, questionID: number, optionIndex:number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url=`${config.api.base}/tests/${testID}/questions/${questionID}`
    return this.http.post<{index:number}>( url, { data:optionIndex},  httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTime(testID:number, time:number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = config.api.base + '/tests/' + testID +'/time';
    return this.http.post<{index:number}>( url, { data:time},  httpOptions).pipe(
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
