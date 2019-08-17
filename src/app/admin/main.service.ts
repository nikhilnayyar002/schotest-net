import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
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
import { QuestionOriginal } from "../amplitude-test/modals/question";
import { Instruction } from "../modals/instruction";
import { Answer } from "../amplitude-test/modals/answer";

interface QuestionsAnswersRes extends QuestionsAnswers {
  status: boolean;
}

@Injectable()
export class MainService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCategories(): Observable<Category[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; categories: Category[] }) => data.categories
      ),
      catchError(()=>of(null))
    );
    return this.http.get( config.routes.category.getCategories()).pipe(
      recipe
    )
  }

  postCategory(category: Category, post: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if (post)
      /** new category */
      return this.http.post(
        config.routes.category.postCategory(),
        category,
        httpOptions
      );
    /** update category */ else
      return this.http.put(
        config.routes.category.postCategory(),
        category,
        httpOptions
      );
  }

  getCategory(catID: string): Observable<Category> {
    let recipe = pipe(
      map((data: { status: boolean; category: Category }) => data.category),
      catchError(()=>of(null))
    );
    return this.http.get( config.routes.category.getCategory(catID)).pipe(
      recipe
    )
  }

  getCategoryStates(): Observable<Category[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; categories: Category[] }) => data.categories
      ),
      catchError(()=>of(null))
    );
    return this.http.get( config.routes.category.getCategoryStates()).pipe(
      recipe
    )
  }

  delCategory(catID: string){
    return this.http.delete(config.routes.category.delete(catID));
  }

  delQuestion(id: string){
    return this.http.delete(config.routes.question.delete(id));
  }

  delAllQuestion(tid: string){
    return this.http.delete(config.routes.question.deleteAll(tid));
  }

  delInstruction(id: string){
    return this.http.delete(config.routes.instruction.delete(id));
  }

  delTest(id: string){
    return this.http.delete(config.routes.test.delete(id));
  }

  postTest(test: TestOriginal, post: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if (post)
      /** new test */
      return this.http.post(config.routes.test.postTest(), test, httpOptions);
    /** update category */ else
      return this.http.put(config.routes.test.postTest(), test, httpOptions);
  }

  findTests(search: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    let data = { search };
    return this.http
      .post(config.routes.test.findTests(), data, httpOptions)
      .pipe(
        map((data: { status: boolean; tests: TestOriginal[] }) => data.tests),
        catchError(() => of(null))
      );
  }

  getTest(
    id: string
  ): Observable<{ test: TestOriginal; categories: Category[] }> {
    let recipe1 = pipe(
      map((data: { status: boolean; test: TestOriginal }) => data.test),
      catchError(()=>of(null))
    );
    let recipe2 = pipe(
      map(
        (data: { status: boolean; categories: Category[] }) => data.categories,
        catchError(()=>of(null))
      )
    );

    let arr = [
      this.http.get( config.routes.test.getTest(id)).pipe(
        recipe1
      )    
      ,
      this.http.get(config.routes.category.getCategoryStates()).pipe(
        recipe2
      )
    ];

    return forkJoin(arr).pipe(
      take(1),
      map((datas: Array<TestOriginal | Category[]>) => {
        let test = <TestOriginal>datas[0],
          categories = <Category[]>datas[1];

        return { test, categories };
      }),
      catchError(error => {
        /** Probably not called. */
        return of(null);
      })
    );
  }

  getTests(pNo: number): Observable<{ tests: TestOriginal[]; count: number }> {
    let recipe1 = pipe(
      map((data: { status: boolean; tests: TestOriginal[] }) => data.tests),
      catchError(()=>of(null))
    );
    let recipe2 = pipe(
      map((data: { status: boolean; count: number[] }) => data.count),
      catchError(()=>of(null))
    );

    let arr = [
      this.http.get(config.routes.test.getTests(pNo)).pipe(
        recipe1
      ),
      this.http.get(config.routes.test.getTestsCount()).pipe(
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

  getQuestions(tid: string): Observable<QuestionOriginal[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; questions: QuestionOriginal[] }) =>
          data.questions
      ),
      catchError(()=>of(null))
    );
    return  this.http.get(config.routes.question.getQuestions(tid)).pipe(
      recipe
    )
  }

  postQuestion(question: QuestionOriginal, post: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if (post)
      /** new test */
      return this.http.post(
        config.routes.question.postQuestion(),
        question,
        httpOptions
      );
    /** update category */ else
      return this.http.put(
        config.routes.question.postQuestion(),
        question,
        httpOptions
      );
  }

  postQuestions(questions: QuestionOriginal[]) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post(
      config.routes.question.postQuestions(),
      questions,
      httpOptions
    );
  }

  postInstruction(instruction: Instruction, post: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if (post)
      /** new test */
      return this.http.post(
        config.routes.instruction.postInstruction(),
        instruction,
        httpOptions
      );
    /** update instruction */ else
      return this.http.put(
        config.routes.instruction.postInstruction(),
        instruction,
        httpOptions
      );
  }

  getInstruction(
    id: string
  ): Observable<{ instruction: Instruction; categories: Category[] }> {
    let recipe1 = pipe(
      map(
        (data: { status: boolean; instruction: Instruction }) =>
          data.instruction
      ),
      catchError(()=>of(null))
    );
    let recipe2 = pipe(
      map(
        (data: { status: boolean; categories: Category[] }) => data.categories
      ),
      catchError(()=>of(null))
    );

    let arr = [
      this.http.get(config.routes.instruction.getInstruction(id)).pipe(
        recipe1
      ),
      this.http.get(config.routes.category.getCategoryStates()).pipe(
        recipe2
      )
    ];

    return forkJoin(arr).pipe(
      take(1),
      map((datas: Array<Instruction | Category[]>) => {
        let instruction = <Instruction>datas[0],
          categories = <Category[]>datas[1];

        return { instruction, categories };
      }),
      catchError(error => {
        /** Probably not called. */
        return of(null);
      })
    );
  }

  getInstructionStates(): Observable<Instruction[]> {
    let recipe = pipe(
      map(
        (data: { status: boolean; instructions: Instruction[] }) =>
          data.instructions
      ),
      catchError(()=>of(null))
    );
    return this.http.get(config.routes.instruction.getInstructionStates()).pipe(
      recipe
    )
  }

  getAnswers(tid: string): Observable<Answer[] | string> {
    let recipe = pipe(
      map((data: { status: boolean; answers: Answer[] }) => data.answers),
      catchError((error: HttpErrorResponse) => {
        if (error.status != 404) return of("Some Error");
        else return of(null);
      })
    );
    return this.http.get(config.routes.answer.getAnswers(tid)).pipe(
      recipe
    )
  }

  postAnswer(answer: Answer, post: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    if (post)
      return this.http.post(
        config.routes.answer.postAnswer(),
        answer,
        httpOptions
      );
    else
      return this.http.put(
        config.routes.answer.postAnswer(),
        answer,
        httpOptions
      );
  }

  postAnswers(answers: Answer[]) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put(
      config.routes.answer.postAnswers(),
      answers,
      httpOptions
    );
  }

  postImage(formData:FormData, fileName:string) {
    const httpOptions = {
      //  /** No need to include Content-Type in Angular 4 */
      headers: new HttpHeaders()
    };
    return this.http.post(config.routes.images.postImage(fileName), formData, httpOptions) 
  }

  delImage(id: string){
    return this.http.delete(config.routes.images.delete(id));
  }
}
