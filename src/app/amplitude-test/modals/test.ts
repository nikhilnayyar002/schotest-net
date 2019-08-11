import { QuestionOriginal, UserQuestion } from "./question";

export interface TestOriginal {
  name: string;
  sections: { [index: string]: { qID:string, sectionOrder:number } };
  detail: string;
  _id: string;
  oTime: number;
  nOfQ:number;
  marks:number;
  isTestReady?:boolean;
  catID:string;
}

export interface UserTestFeatures {
  time?: number;
  isTestOver?: boolean;
  hasTestStarted?: boolean;
}

export interface UserTest {
  _id:string;
  time: number;
  isTestOver: boolean;
  questions: { [index: string]: string };
}

export interface TestWithFeatures extends TestOriginal, UserTestFeatures {
  /** test is ready when all properties of "TestOriginal" are all good set */
  questions:QuestionOriginal[]
}

export interface TestWithFeaturesForUser extends TestOriginal, UserTestFeatures {
  /** test is ready when all properties of "TestOriginal" are all good set */
  questions: { [index: string]: UserQuestion };
}