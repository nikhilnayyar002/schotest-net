import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as TestActions from "./state.actions";
import { tap, take } from "rxjs/operators";
import { MainService } from "../main.service";
import { Observable } from "rxjs";
import { Action, Store, select } from "@ngrx/store";
import { GLobalState } from "src/app/shared/global.state";
import { Router } from '@angular/router';
import config from 'src/data/config';

@Injectable({
  providedIn: "root"
})
export class TestEffect {
  constructor(
    private actions$: Actions,
    private ms: MainService,
    private store: Store<GLobalState>,
    private router:Router
  ) {}

  updateQuestion: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestActions.UpdateQuestion),
        tap(action =>
          this.store.pipe(take(1)).subscribe(globalState => {
            this.ms
              .updateQuestion(
                globalState.app.user.id,
                globalState.test._id,
                action.question._id,
                action.question.answers[action.question.checkedAnswerIndex]
              )
              .subscribe(null, error => console.error(error));
          })
        )
      ),
    { dispatch: false }
  );

  clearResponse$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestActions.ClearResponse),
        tap(action =>
          this.store.pipe(take(1)).subscribe(globalState => {
            this.ms
              .updateQuestion(
                globalState.app.user.id,
                globalState.test._id,
                action.question._id,
                null
              )
              .subscribe(() => null, error => console.error(error));
          })
        )
      ),
    { dispatch: false }
  );

  pauseTest$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TestActions.PauseTestServer),
        tap(action =>
          this.store.pipe(take(1)).subscribe(globalState => {
            this.store.dispatch(TestActions.TestSubmitting({submittingTest:true}))
            this.ms
              .updateTime(
                globalState.app.user.id,
                globalState.test._id,
                action.time,
                action.isTestOver?true:false
              ).subscribe(
                () => {
                  this.store.dispatch(TestActions.TestSubmitting({submittingTest:false}))
                  if(action.isTestOver)
                      /** navigate to completed component */
                      this.router.navigate([config.clientRoutes.completedTest(globalState.test._id)])
                },
                error => this.store.dispatch(TestActions.TestSubmitting({submittingTest:false}))
              )
          })
        )
      ),
    { dispatch: false }
  );
}

/**
 * Version one
 */
// GetTest$: Observable<Action> = createEffect(() => this.actions$.pipe(
//     ofType(TestActions.GetTest),
//     concatMap((action) =>
//         this.ms.getTest(action.id).pipe(
//             map(test => TestActions.SetTest({ test }))
//         )
//     ),
//     catchError(()=>of(TestActions.GetError()))
// ));

/**
 * This is version 2.
 */
// GetTest$: Observable<Action> = createEffect(
//   () =>
//     this.actions$.pipe(
//       ofType(TestActions.GetTest),
//       tap(action =>
//         this.ms
//           .getTest(action.id)
//           .pipe(take(1))
//           .subscribe(
//             test => this.store.dispatch(TestActions.SetTest({ test })),
//             error => onTestNotFetched(error as string)
//           )
//       )
//     ),
//   { dispatch: false }
// );
