import * as mongoose from "mongoose";
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

/** Mongoose Schema and Modal */

export const TestSchema = new mongoose.Schema<TestOriginal & mongoose.Document>({
  name: String,
  sections: mongoose.Schema.Types.Mixed,
  oTime: { type: Number },
  detail: { type: String },
  _id: { type: String },
  isTestReady:{ type: Boolean },

  nOfQ:Number,
  marks:Number,
  catID:String
});

export const TestModal = mongoose.model("Test", TestSchema);
