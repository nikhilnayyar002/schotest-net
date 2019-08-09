import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map, debounceTime } from "rxjs/operators";
import config from "../../data/config";
import { QuestionStateDB } from "./shared/indexDB";
import { UserTest, TestWithFeatures, TestWithFeaturesForUser } from "./modals/test";
import { UserQuestion } from './modals/question';

@Injectable()
export class MainService {
  constructor(private http: HttpClient) {}

  getTest(userID: string, id: string): Observable<TestWithFeaturesForUser> {
    return this.http.get(config.routes.test.getTest(id)).pipe(
      map((data: { status: boolean; test: TestWithFeatures }) => {
        let questions:{ [index: string]: UserQuestion } = {},
          test:TestWithFeaturesForUser,
          sections = data.test.sections
        data.test.questions.forEach((question)=>{
          questions[question._id] = <UserQuestion>question
          sections[question.section].qID?null:(
            sections[question.section].qID = question._id
          )
        })
        console.log( data.test.questions, questions)
        test = {...data.test, questions}
        return test
      }),
      tap(test => {
        QuestionStateDB.testID = userID + test._id;
        /** Asynchronous */
        QuestionStateDB.setup(test.questions);
      }),
      catchError(this.handleError)
    );
  }

  getUserTest(uid: string, id: string): Observable<UserTest> {
    return this.http.get(config.routes.userData.getUserTest(uid, id)).pipe(
      map((data: { status: boolean; test: UserTest }) => data.test),
      catchError(this.handleError)
    );
  }

  updateQuestion(uid: string, tid: string, qid: string, ans: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let data = { id: tid, question: {} };
    data.question[qid] = ans;

    return this.http
      .post(config.routes.userData.postUserTestQ(uid), data, httpOptions)
      .pipe(
        debounceTime(1500),
        catchError(this.handleError)
      );
  }

  updateTime(uid: string, tid: string, time: number, isTestOver: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let data = { id: tid, time, isTestOver };
    return this.http
      .post(config.routes.userData.postUserTestT(uid), data, httpOptions)
      .pipe(catchError(this.handleError));
  }

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
    return throwError("Something bad happened; please try reloading the page");
  }
}
