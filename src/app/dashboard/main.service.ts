import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../modals/category';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import config from 'src/data/config';
import { Question } from '../amplitude-test/modals/question';
import { Test } from '../amplitude-test/modals/test';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http: HttpClient) { }

  /**
   * Fetches questions and sets the questions array locally
   */
  getCategories(): Observable<Category[]> {

    let url=`${config.api.base}/categories/all`
    return this.http.get(url)
      .pipe(
        map((data:any)=>{
          data.map((category)=>{
            category.id=category._id
            category.tests.map((test)=>{
              test.id=test._id;
              test.questions.map((question)=>{
                question.id=question._id;
                return question as Question
              })
              return test as Test
            })
            return category as Category
          })
          return data as Category[]
        }),
        tap((data)=>{
          // QuestionStateDB.testID=test.id
          // QuestionStateDB.setup(test.questions)
        }),
        catchError(this.handleError)
      )
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
