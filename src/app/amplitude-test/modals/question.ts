import { QuestionState } from '../shared/global';

export interface Question {
    content:string;
    image:string;
    isComprehension:boolean;
    comprehensionContent:string;
    answers:Array<string>;
    /** It will store the state of Question*/
    state:QuestionState;
    /** It will note the current checked answer index */
    checkedAnswerIndex:number;
    _id:string; 
    section:string;
    /** marks */
    marks:number;
}
