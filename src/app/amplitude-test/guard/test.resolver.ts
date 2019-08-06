import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { MainService } from '../main.service';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import { take, switchMap, catchError, map, tap } from 'rxjs/operators';
import { SetTest } from '../state/state.actions';
import { of, forkJoin, Observable } from 'rxjs';
import { TestWithFeatures, UserTest, TestWithFeaturesForUser } from '../modals/test';
import config from 'src/data/config';

@Injectable()
export class TestResolverService {
  constructor(
    private ms:MainService,
    private store:Store<GLobalState>,
    private router:Router
    ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  :Observable<TestWithFeatures> | Observable<null> {
    let testID = route.paramMap.get("id"),
        arr = [
          this.store.select(s=>s.app.user).pipe(
            take(1),
            switchMap(user => this.ms.getTest(user.id,testID))
          ),
          this.store.select(s=>s.app.user).pipe(
            take(1),
            switchMap(user => this.ms.getUserTest(user.id, testID))
          )
        ]

    return forkJoin(arr).pipe(
      take(1),
      map((tests:(TestWithFeaturesForUser|UserTest)[])=>{
        let test=<TestWithFeaturesForUser>tests[0], userTest=<UserTest>tests[1]
        if(userTest && userTest.isTestOver) test.isTestOver = true;
        else if(userTest) {
          if(userTest.time != undefined || userTest.time != null) 
            test.time =userTest.time
          for(let i in userTest.questions){
            let answer = userTest.questions[i],
              index = answer?test.questions[i].answers.indexOf(answer):null;
            test.questions[i].checkedAnswerIndex = index
          }
        }
        return test
      }),
      switchMap((test:TestWithFeaturesForUser)=>{
        /**
         * Test is over
         */
   
        if(test.isTestOver) {
          this.router.navigate([config.clientRoutes.completedTest(test._id)])
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

