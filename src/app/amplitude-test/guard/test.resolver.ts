import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
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
    private store:Store<GLobalState>
    ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let testID = +route.paramMap.get("id"),
        arr = [
          this.ms.getTest(testID)
        ]
        
    return forkJoin(arr).pipe(
      take(1),
      map(()=>),
      switchMap((test)=>{
        this.store.dispatch(SetTest({ test }))
        return of(true)
      }),
      catchError((error)=>{
        onTestNotFetched(error as string)
        return of(false)
      })
    )
  }

}

