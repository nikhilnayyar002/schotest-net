import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { MainService } from '../main.service';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { take, switchMap, catchError, map } from 'rxjs/operators';
import { SetTest } from '../state/state.actions';
import { of, forkJoin, throwError } from 'rxjs';
import { onTestNotFetched } from '../shared/global';

@Injectable()
export class TestResolverService {
  constructor(
    private ms:MainService,
    private store:Store<GLobalState>,
    private router:Router
    ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
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
      map((tests)=>{
        if(tests[1]) {
          if(tests[1].time != undefined || tests[1].time != null) 
            tests[0].time = tests[1].time
          for(let i in tests[1].questions){
            let answer = <any> tests[1].questions[i],
              index = answer?tests[0].questions[i].answers.indexOf(answer):null
            tests[0].questions[i].checkedAnswerIndex = index
          }
        }
        return tests[0]
      }),
      switchMap((test)=>{
        /**
         * Test is already completed 
         */
        if(!test.time) {
          this.router.navigate(['/dashboard/completed/'+test._id])
          return of(null)
        }
        /**
         * Test can be set now 
         */
        this.store.dispatch(SetTest({ test }))
        return of(test)
      }),
      catchError((error)=>{
        /**
         * Error no test resolved
         */
        return of(null)
      })
    )
  }

}

