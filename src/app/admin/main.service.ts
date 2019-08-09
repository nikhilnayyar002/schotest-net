import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, pipe, forkJoin, of } from "rxjs";
import { map, take, switchMap, tap, catchError } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { UserTest, TestOriginal } from "../amplitude-test/modals/test";
import { BackendStatus, QuestionsAnswers } from "../shared/global";
import { SetAppState } from "../state/state.actions";
import { QuestionOriginal } from '../amplitude-test/modals/question';

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

  postCategory(category: Category, post:boolean){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if(post) /** new category */
      return this.http.post(config.routes.category.postCategory(),category,httpOptions)
    else  /** update category */
      return this.http.put(config.routes.category.postCategory(),category,httpOptions)
  } 

  getCategory(catID:string): Observable<Category[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; category: Category }) => data.category
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.category.getCategory(catID),
      recipe
    );
  }

  getTestState(id:string): Observable<TestOriginal | string> {
    let recipe = pipe(
      map(
        (data: { status: boolean; test: TestOriginal }) => data.test
      ),
      catchError(error=>of(error.error.message))
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.test.getTestState(id),
      recipe
    );
  }

  postTest(test: TestOriginal, post:boolean){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if(post) /** new test */
      return this.http.post(config.routes.test.postTest(),test,httpOptions)
    else  /** update category */
      return this.http.put(config.routes.test.postTest(),test,httpOptions)
  } 
  getTest(id:string): Observable<Category[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; test: TestOriginal }) => data.test
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.test.getTest(id),
      recipe
    );
  }
  
  getQuestions(tid:string): Observable<QuestionOriginal[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; questions: QuestionOriginal[] }) => data.questions
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.question.getQuestions(tid),
      recipe
    );
  }

  postQuestion(question:QuestionOriginal,post:boolean){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if(post) /** new test */
      return this.http.post(config.routes.question.postQuestion(),question,httpOptions)
    else  /** update category */
      return this.http.put(config.routes.question.postQuestion(),question,httpOptions)
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
