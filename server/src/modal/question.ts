
export interface Question {
  content: string;
  image: string;
  isComprehension: boolean;
  comprehensionContent: string;
  answers: Array<string>;
  _id: string;
  section: string;
  marks: number;
}

export interface UserQuestion extends Question {
    /** It will store the state of Question*/
    state: string;
    /** It will note the current checked answer index */
    checkedAnswerIndex: number;
}

// answers: { 
//   [index: string]: {
//     value:string,
//     data:string;
//   }
// };