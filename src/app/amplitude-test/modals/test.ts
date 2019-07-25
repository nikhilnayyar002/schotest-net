import { Question } from "./question";

export interface TestBase {
  name: string;
  sections: { [index: string]: string };
  detail: string;
  _id: string;
  time:number;
  /**
   * if test has been started by the user (determined by checking time
   * property of test in user->tests) then it will be true.
   * The category->tests component will then show "continue" button.
   *
   * Also need to be pointed that if time property is zero then
   * "test over" should be shown instead of "continue" button
   */
  hasTestStarted: boolean;
  /**
   * it stores the original time. It is equal to initial value of "time" 
   */
  oTime:number;  
}

export interface Test extends TestBase {
  questions: { [index: string]: Question };
}

export interface BackendTestResponse extends TestBase {
  questions: {
    length: number;
    marks: number;
    time:number;
  };
}
