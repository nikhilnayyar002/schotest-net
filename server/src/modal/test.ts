import * as mongoose from "mongoose";

/** Typescript Modal  */
export interface Question  {
    content:string;
    image:string;
    isComprehension:boolean;
    comprehensionContent:string;
    answers:string[];
    _id: string;
    section:string;
    marks:number;
}

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
     * it stores the time left for the user
     */
    uTime:number;
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
  

/** Mongoose Schema and Modal */

export const TestSchema = new mongoose.Schema<Test & mongoose.Document>({
    name:String,
    questions: mongoose.SchemaTypes.Mixed,
    sections: mongoose.SchemaTypes.Mixed,
    time: { type:Number },
    detail:{type:String},
    _id: { type:String },
    hasTestStarted:{ type:Boolean }
});


/**
 * Schema @Methods
 */

export const TestModal =mongoose.model("Test", TestSchema);
