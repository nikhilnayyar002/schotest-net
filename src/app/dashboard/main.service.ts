import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, pipe } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { TestResponse } from '../amplitude-test/modals/test';

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
  getCategories(): Observable<Category[]> {
    let recipe = pipe(
      map((data: {status:boolean; categories:Category[]; }) =>data.categories )
    );
    return this.auth.tryWithRefreshIfNecc(config.routes.category.getCategories(), recipe);
  }

  getTests(categoryID: string): Observable<TestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map((data: {status:boolean; tests:TestResponse[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(
            config.routes.category.getCategoryTests(categoryID, user.email), recipe
          );
        })
      );
  }

  getPausedTests(): Observable<TestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map((data: {status:boolean; tests:TestResponse[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(
            config.routes.userData.getPausedTests(user.id), recipe
          );
        })
      );
  }

  getCompletedTests(): Observable<TestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map((data: {status:boolean; tests:TestResponse[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(
            config.routes.userData.getCompletedTests(user.id), recipe
          );
        })
      );
  }

}
