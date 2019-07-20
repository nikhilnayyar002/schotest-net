import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, throwError, pipe } from "rxjs";
import { map, tap, catchError, take, switchMap } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { Test } from "../amplitude-test/modals/test";
import { Question } from "../amplitude-test/modals/question";

@Injectable({
  providedIn: "root"
})
export class MainService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: Store<GLobalState>
  ) {
    console.log("main");
  }

  /**
   * Fetches questions and sets the questions array locally
   */
  getCategories(): Observable<Category[] | any> {
    let url = `${config.api.base}/categories`;
    let recipe = pipe(
      map((data: any) => {
        data.map(category => {
          category.id = category._id;
          return category as Category;
        });
        return data as Category[];
      })
    );
    return this.auth.tryWithRefreshIfNecc(url, recipe);
  }

  getTests(categoryID: string): Observable<Test[] | any> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let url = `${config.api.base}/categories/${categoryID}?email=${user.email}`;
          let recipe = pipe(
            map((tests: any) => {
              tests.map(test => {
                test.id = test._id;
                return test as Test;
              });
              return tests as Test[];
            })
          );
          return this.auth.tryWithRefreshIfNecc(url, recipe);
        })
      );
  }
}
