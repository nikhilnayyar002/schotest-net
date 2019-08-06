import * as mongoose from "mongoose";

export interface QuestionOriginal {
  content: string;
  image: string;
  isComprehension: boolean;
  comprehensionContent: string;
  answers: Array<string>;
  _id: string;
  section: string;
  marks: number;

  sectionOrder:number;
  tID:string;
}

export interface UserQuestion extends QuestionOriginal {
    /** It will store the state of Question*/
    state: string;
    /** It will note the current checked answer index */
    checkedAnswerIndex: number;
}


/** Mongoose Schema and Modal */

export const QuestionSchema = new mongoose.Schema<QuestionOriginal & mongoose.Document>({
  content: String,
  image: String,
  isComprehension: Boolean,
  comprehensionContent: String,
  answers: [String],
  _id: String,
  section: String,
  sectionOrder:Number,
  marks: Number,
  tID:String
});


export const QuestionModal  = mongoose.model("Question", QuestionSchema);
