import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { MainService } from '../main.service';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { take, switchMap, catchError, map } from 'rxjs/operators';
import { SetTest } from '../state/state.actions';
import { of, forkJoin } from 'rxjs';
import { onTestNotFetched } from '../shared/global';
import { AmplitudeTestModule } from '../amplitude-test.module';

@Injectable({
  providedIn: AmplitudeTestModule
})
export class TestResolverService {
  constructor(
    private ms:MainService,
    private store:Store<GLobalState>,
    private router:Router
    ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let testID = route.paramMap.get("id"),
        arr = [
          this.ms.getTest(testID),
          this.store.select(s=>s.app.user).pipe(
            take(1),
            switchMap(user => this.ms.getUserTest(user.id, testID))
          )
        ]
        
    return forkJoin(arr).pipe(
      take(1),
      map((tests)=>({ ...tests[0], ...tests[1]})),
      switchMap((test)=>{
        if(!test.time) {
          this.router.navigate(['/dashboard/completed/'+test._id])
          return of(null)
        }
        this.store.dispatch(SetTest({ test }))
        return of(test)
      }),
      catchError((error)=>{
        onTestNotFetched(error as string)
        return of(null)
      })
    )
  }

}

