import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, pipe, forkJoin } from "rxjs";
import { map, take, switchMap, tap } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { TestResponse, UserTest } from "../amplitude-test/modals/test";
import { BackendStatus, QuestionsAnswers } from "../shared/global";
import { SetAppState } from "../state/state.actions";

interface QuestionsAnswersRes extends QuestionsAnswers {
  status: boolean;
}

@Injectable()
export class MainService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: Store<GLobalState>
  ) {}

  getCategories(): Observable<Category[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; categories: Category[] }) => data.categories
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.category.getCategories(),
      recipe
    );
  }

  // getTests(categoryID: string): Observable<TestResponse[]> {
  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user => {
  //         let recipe = pipe(
  //           map(
  //             (data: { status: boolean; tests: TestResponse[] }) => data.tests
  //           )
  //         );
  //         return this.auth.tryWithRefreshIfNecc(
  //           config.routes.category.getCategoryTests(categoryID, user.email),
  //           recipe
  //         );
  //       })
  //     );
  // }

  // getPausedTests(): Observable<TestResponse[]> {
  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user => {
  //         let recipe = pipe(
  //           map(
  //             (data: { status: boolean; tests: TestResponse[] }) => data.tests
  //           )
  //         );
  //         return this.auth.tryWithRefreshIfNecc(
  //           config.routes.userData.getPausedTests(user.id),
  //           recipe
  //         );
  //       })
  //     );
  // }

  // getCompletedTests(): Observable<TestResponse[]> {
  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user => {
  //         let recipe = pipe(
  //           map(
  //             (data: { status: boolean; tests: TestResponse[] }) => data.tests
  //           )
  //         );
  //         return this.auth.tryWithRefreshIfNecc(
  //           config.routes.userData.getCompletedTests(user.id),
  //           recipe
  //         );
  //       })
  //     );
  // }

  // postFavourites(cid: string): Observable<BackendStatus | Error> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user =>
  //         this.http
  //           .post<BackendStatus>(
  //             config.routes.userData.postUserFavourites(user.id),
  //             { id: cid },
  //             httpOptions
  //           )
  //           .pipe(
  //             tap(() => {
  //               /** Set the favourites */
  //               let newUser = { ...user };
  //               newUser.favourites.push(cid);
  //               this.store.dispatch(SetAppState({ app: { user: newUser } }));
  //             })
  //           )
  //       )
  //     );
  // }

  // delFavourites(cid: string): Observable<BackendStatus | Error> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ "Content-Type": "application/json" })
  //   };

  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user =>
  //         this.http
  //           .post<BackendStatus>(
  //             config.routes.userData.delUserFavourites(user.id),
  //             { id: cid },
  //             httpOptions
  //           )
  //           .pipe(
  //             tap(() => {
  //               /** Set the favourites */
  //               let newUser = { ...user };
  //               newUser.favourites = newUser.favourites.filter(id => id != cid);
  //               this.store.dispatch(SetAppState({ app: { user: newUser } }));
  //             })
  //           )
  //       )
  //     );
  // }

  // getFavouriteCategories(): Observable<Category[]> {
  //   return this.store
  //     .select(state => state.app.user)
  //     .pipe(
  //       take(1),
  //       switchMap(user => {
  //         let recipe = pipe(
  //           map(
  //             (data: { status: boolean; categories: Category[] }) =>
  //               data.categories
  //           )
  //         );
  //         return this.auth.tryWithRefreshIfNecc(
  //           config.routes.userData.getUserFavourites(user.id),
  //           recipe
  //         );
  //       })
  //     );
  // }

  // getQuestionsAnswers(testID: string)
  // :Observable<{userTest:UserTest, questionsAnswers:QuestionsAnswers}|null>{
  //   let recipeForQandA = pipe(
  //     map((data: QuestionsAnswersRes) => ({
  //       answers: data.answers,
  //       questions: data.questions
  //     }))
  //   );
  //   let recipeForUserTest = pipe(
  //     map((data: {status:boolean, test:UserTest}) => data.test)
  //   );

  //   let arr = [
  //     this.store.select(s=>s.app.user).pipe(
  //       take(1),
  //       switchMap(user => 
  //         this.auth.tryWithRefreshIfNecc(
  //           config.routes.userData.getUserTest(user.id, testID),
  //           recipeForUserTest
  //         )
  //       )
  //     ),
  //     this.auth.tryWithRefreshIfNecc(
  //       config.routes.test.getQuestionsAnswers(testID),
  //       recipeForQandA
  //     )
  //   ]

  //   return forkJoin(arr).pipe(
  //     take(1),
  //     map((data:(UserTest | QuestionsAnswers)[])=>{
  //       let userTest=<UserTest>data[0], questionsAnswers=<QuestionsAnswers>data[1]
  //       if(!userTest || !questionsAnswers) return null
  //       return {  userTest,  questionsAnswers}
  //     })
  //   )
  // }
  
}
