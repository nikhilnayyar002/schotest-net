import { UserQuestion } from '../modals/question';

export enum QuestionState {
  Marked = "Marked",
  Unvisited = "Unvisited",
  Markedanswered = "Markedanswered",
  Answered = "Answered",
  Unanswered = "Unanswered"
}

/**
 * Checks the current question and updates it status.
 * This method is to be called before @setQuestionSelected
 */
export function checkAndGetQuestionState(question: UserQuestion) {
  let state: QuestionState = question.state;
  if (question.checkedAnswerIndex != null) {
    if(question.state == QuestionState.Marked)
      state = QuestionState.Markedanswered;
    else if (question.state != QuestionState.Markedanswered && question.state != QuestionState.Answered)
      state = QuestionState.Answered;
  } else {
    if(question.state != QuestionState.Marked)
      state = QuestionState.Unanswered;
  }
  return state;
}

/**
 * returns next question @index relative to current index
 *
 */
export function getNextQuestionIndex(questions:{[index:string]:UserQuestion}, id:string): string {
  let keys = Object.keys(questions), 
    nextIndex = keys.indexOf(id) != (keys.length - 1)?(keys.indexOf(id)+1):0
   return keys[nextIndex]; 
}

/**
 * this is what we do when test is not fetched
 * Also this is function is called when test is over. see @isTestOverNotif parameter.
 */
export function onTestNotFetched(error: string, isTestOverNotif = false) {
  if (!isTestOverNotif) {
    (<HTMLElement>document.querySelector("#error-message")).innerText = error;
    (<HTMLButtonElement>document.querySelector("#error-btn")).click();
  }
  let btns = document.querySelectorAll('[type="button"]');
    btns.forEach(btn => ((<HTMLButtonElement>btn).disabled = true));
  let radios = document.querySelectorAll('[type="radio"]');
    radios.forEach(radio => ((<HTMLButtonElement>radio).disabled = true));
}

export class SideState {
  sideStateOpen = true;
  shortenArrowMargin = this.sideStateOpen ? `-${this.shortenArrowMarginSize}` : "0px";
  shortenArrowText = this.sideStateOpen ? "&rarr;" : "&larr;";

  constructor(
    private parentSelector:string,
    private sideWidth:string,
    private shortenArrowMarginSize:string
    ) {}

  toggler = (bool: boolean, mediaMatch: boolean) => {
    /** Parent element that will be pushed to the left when side pops out on small screen */
    let main = <HTMLElement>document.querySelector(this.parentSelector);
    if (bool == null) bool = !this.sideStateOpen; //on shortenClick(). see app.component.ts

    if (bool) {
      this.shortenArrowText = "&rarr;";
      this.shortenArrowMargin = `-${this.shortenArrowMarginSize}`;
      this.sideStateOpen = true;

      if (mediaMatch) {
        // 320px value equal to width of side is hardcoded
        main.style.width = `calc(100% + ${this.sideWidth})`;
        main.style.left = `-${this.sideWidth}`;
      }
    } else {
      this.shortenArrowText = "&larr;";
      this.shortenArrowMargin = "0px";
      this.sideStateOpen = false;

      if (mediaMatch) {
        main.style.width = "100%";
        main.style.left = "0px";
      }
    }
    if (!mediaMatch) {
      main.style.width = "100%";
      main.style.left = "0px";
    }
  };
}
