import * as mongoose from "mongoose";
import { Question, UserQuestion } from "./question";

export interface TestBase {
  name: string;
  sections: { [index: string]: string };
  detail: string;
  _id: string;
  oTime: number;
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

export interface TestOriginal extends TestBase {
  questions: { [index: string]: Question };
}

export interface TestWithFeatures extends TestBase, UserTestFeatures {
  questions: { [index: string]: UserQuestion };
}


export interface TestResponse extends TestBase, UserTestFeatures {
  questions: {
    length: number;
    marks: number;
  };
}

/** Mongoose Schema and Modal */

export const TestSchema = new mongoose.Schema<TestOriginal & mongoose.Document>({
  name: String,
  questions: mongoose.SchemaTypes.Mixed,
  sections: mongoose.SchemaTypes.Mixed,
  oTime: { type: Number },
  detail: { type: String },
  _id: { type: String },
});

/**
 * Schema @Methods
 */

export const TestModal = mongoose.model("Test", TestSchema);
