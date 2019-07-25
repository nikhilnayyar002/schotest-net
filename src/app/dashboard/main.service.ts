import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, pipe } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { Test, BackendTestResponse } from "../amplitude-test/modals/test";

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
    let url = `${config.api.base}/categories`;
    let recipe = pipe(
      map((data: {status:boolean; categories:Category[]; }) =>data.categories )
    );
    return this.auth.tryWithRefreshIfNecc(url, recipe);
  }

  getTests(categoryID: string): Observable<BackendTestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let url = `${config.api.base}/categories/${categoryID}/tests?email=${user.email}`;
          let recipe = pipe(
            map((data: {status:boolean; tests:Test[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(url, recipe);
        })
      );
  }

  getPausedTests(): Observable<BackendTestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let url = `${config.api.base}/userData/${user.id}/tests/paused`;
          let recipe = pipe(
            map((data: {status:boolean; tests:Test[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(url, recipe);
        })
      );
  }

  getCompletedTests(): Observable<BackendTestResponse[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let url = `${config.api.base}/userData/${user.id}/tests/completed`;
          let recipe = pipe(
            map((data: {status:boolean; tests:Test[]; }) =>data.tests )
          );
          return this.auth.tryWithRefreshIfNecc(url, recipe);
        })
      );
  }

}
