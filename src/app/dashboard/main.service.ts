import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../modals/category";
import { Observable, pipe, forkJoin, of } from "rxjs";
import { map, take, switchMap, tap, catchError } from "rxjs/operators";
import config from "../../data/config";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import {  UserTest, TestWithFeatures, TestWithFeaturesForUser, TestOriginal } from "../amplitude-test/modals/test";
import { BackendStatus, QuestionsAnswers } from "../shared/global";
import { SetAppState } from "../state/state.actions";
import { QuestionOriginal } from '../amplitude-test/modals/question';
import { Answer, Answers } from '../amplitude-test/modals/answer';

interface QuestionsAnswersRes{
  status: boolean;
  questions: QuestionOriginal[];
  answers: Answer[]
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
      ),
      catchError(()=>of(null))
    );

    return this.http.get(config.routes.category.getCategories()).pipe(
      recipe
    )
  }

  getTests(categoryID: string, pNo:number): Observable<{ tests: TestOriginal[]; count: number }> {
    let recipe1 = pipe(
      map((data: { status: boolean; tests: TestOriginal[] }) => data.tests),
      catchError(()=>of(null))
    );
    let recipe2 = pipe(
      map((data: { status: boolean; count: number[] }) => data.count),
      catchError(()=>of(null))
    );

    let arr = [
       this.http.get(config.routes.test.getTestsByCategory(categoryID,pNo)).pipe(
        recipe1
      ),
       this.http.get(config.routes.test.getTestsByCategoryCount(categoryID)).pipe(
        recipe2
      )
    ];

    return forkJoin(arr).pipe(
      take(1),
      map((datas: Array<TestOriginal[] | number>) => {
        let tests = <TestOriginal[]>datas[0],
          count = <number>datas[1];
        return { tests, count };
      }),
      catchError(error => {
        /** Probably not called. */
        return of(null);
      })
    );
  }



  getPausedTests(): Observable<TestWithFeaturesForUser[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map(
              (data: { status: boolean; tests: TestWithFeaturesForUser[] }) => data.tests
            ),
            catchError(()=>of(null))
          );
          return this.http.get(config.routes.userData.getPausedTests(user.id)).pipe(
            recipe
          )
        })
      );
  }

  getCompletedTests(): Observable<TestWithFeaturesForUser[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map(
              (data: { status: boolean; tests: TestWithFeaturesForUser[] }) => data.tests
            ),
            catchError(()=>of(null))
          );
          return this.http.get(config.routes.userData.getCompletedTests(user.id)).pipe(
            recipe
          )
        })
      );
  }

  postFavourites(cid: string): Observable<BackendStatus | Error> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user =>
          this.http
            .post<BackendStatus>(
              config.routes.userData.postUserFavourites(user.id),
              { id: cid },
              httpOptions
            )
            .pipe(
              tap(() => {
                /** Set the favourites */
                let newUser = { ...user };
                newUser.favourites.push(cid);
                this.store.dispatch(SetAppState({ app: { user: newUser } }));
              })
            )
        )
      );
  }

  delFavourites(cid: string): Observable<BackendStatus | Error> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user =>
          this.http
            .post<BackendStatus>(
              config.routes.userData.delUserFavourites(user.id),
              { id: cid },
              httpOptions
            )
            .pipe(
              tap(() => {
                /** Set the favourites */
                let newUser = { ...user };
                newUser.favourites = newUser.favourites.filter(id => id != cid);
                this.store.dispatch(SetAppState({ app: { user: newUser } }));
              })
            )
        )
      );
  }

  getFavouriteCategories(): Observable<Category[]> {
    return this.store
      .select(state => state.app.user)
      .pipe(
        take(1),
        switchMap(user => {
          let recipe = pipe(
            map(
              (data: { status: boolean; categories: Category[] }) =>
                data.categories
            ),
            catchError(()=>of(null))
          );
          return this.http.get(config.routes.userData.getUserFavourites(user.id)).pipe(
            recipe
          )
        })
      );
  }

  getQuestionsAnswers(testID: string)
  :Observable<{userTest:UserTest, questionsAnswers:QuestionsAnswers}|null>{
    let recipeForQandA = pipe(
      map((data: QuestionsAnswersRes) => {
        let questions:{ [index: string]: QuestionOriginal } = {}
        , answers:Answers ={}
        data.questions.forEach((question)=> questions[question._id] = question)
        if(data.answers.length)
          data.answers.forEach((answer)=>  answers[answer._id] = { value:answer.value, data:answer.data  })
        else answers = null
        return {questions, answers}
      }),
      catchError(()=>of(null))
    );
    let recipeForUserTest = pipe(
      map((data: {status:boolean, test:UserTest}) => data.test),
      catchError(()=>of(null))
    );

    let arr = [
      this.store.select(s=>s.app.user).pipe(
        take(1),
        switchMap(user => 

          this.http.get(config.routes.userData.getUserTest(user.id, testID)).pipe(
            recipeForUserTest
          )

        )
      ),
      this.http.get(config.routes.test.getQuestionsAnswers(testID)).pipe(
        recipeForQandA
      )
    ]

    return forkJoin(arr).pipe(
      take(1),
      map((data:(UserTest | QuestionsAnswers)[])=>{
        let userTest=<UserTest>data[0], questionsAnswers=<QuestionsAnswers>data[1]
        if(!userTest || !questionsAnswers) return null
        return {  userTest, questionsAnswers}
      })
    )
    
  }
}
