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
import { Instruction } from '../modals/instruction';

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

  getCategory(catID:string): Observable<Category> {
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
  getTest(id:string): Observable<TestOriginal> {
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

  postQuestions(questions:QuestionOriginal[]){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(config.routes.question.postQuestions(),questions,httpOptions)
  }   

  postInstruction(instruction: Instruction, post:boolean){
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if(post) /** new test */
      return this.http.post(config.routes.instruction.postInstruction(),instruction,httpOptions)
    else  /** update category */
      return this.http.put(config.routes.category.postCategory(),instruction,httpOptions)
  } 

  getInstruction(id:string): Observable<Instruction> {
    let recipe = pipe(
      map(
        (data: { status: boolean; instruction: Instruction }) => data.instruction
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.instruction.getInstruction(id),
      recipe
    );
  }

  getInstructionStates(): Observable<Instruction[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; instructions: Instruction[] }) => data.instructions
      )
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.instruction.getInstructionStates(),
      recipe
    );
  }

  getInstructionState(id:string): Observable<TestOriginal | string> {
    let recipe = pipe(
      map(
        (data: { status: boolean; instruction: Instruction }) => data.instruction
      ),
      catchError(error=>of(error.error.message))
    );
    return this.auth.tryWithRefreshIfNecc(
      config.routes.instruction.getInstructionState(id),
      recipe
    );
  }

}
