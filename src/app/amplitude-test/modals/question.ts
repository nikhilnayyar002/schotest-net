import { QuestionState } from "../shared/global";

export interface QuestionOriginal {
  content: string;
  image: string;
  isComprehension: boolean;
  comprehensionContent: string;
  answers: Array<string>;
  _id: string;
  section: string;
  marks: number;
}

export interface UserQuestion extends QuestionOriginal {
    /** It will store the state of Question*/
    state: QuestionState;
    /** It will note the current checked answer index */
    checkedAnswerIndex: number;
}