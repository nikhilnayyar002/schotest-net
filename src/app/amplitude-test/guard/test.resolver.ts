import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DashboardModule } from '../dashboard.module';
import { MainService } from '../main.service';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { take, switchMap, catchError } from 'rxjs/operators';
import { SetTest } from '../state/state.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardResolverService {
  constructor(
    private ms:MainService,
    private store:Store<GLobalState>
    ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let testID = +route.paramMap.get("id")
    return this.ms.getTest(testID).pipe(
      take(1),
      switchMap((test)=>{
        this.store.dispatch(SetTest({ test }))
        of(true)
      }),
      catchError(()=>{
        onTestNotFetched(error as string)
      })
    )
  }

}

GetTest$: Observable<Action> = createEffect(
  () =>
    this.actions$.pipe(
      ofType(TestActions.GetTest),
      tap(action =>
        this.ms
          .getTest(action.id)
          .pipe(take(1))
          .subscribe(
            test => ,
            error => 
          )
      )
    ),
  { dispatch: false }
);
