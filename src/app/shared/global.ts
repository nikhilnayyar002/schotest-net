import { ChangeDetectorRef } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { UserProfile } from "../modals/user";
import { QuestionOriginal } from "../amplitude-test/modals/question";
import { Answers } from "../amplitude-test/modals/answer";
import { AbstractControl, ValidatorFn } from "@angular/forms";

export interface MediaQueryState {
  dispose: () => void;
  isMediaMatched: () => boolean;
  runMediaQuery: () => void;
}
export interface BackendStatus {
  status: boolean;
  message?: string;
  token?: string;
  user?: UserProfile;
}

export interface Credentials {
  fullName?:string;
  email: string;
  password: string;
}

export interface QuestionsAnswers {
  answers: Answers;
  questions: { [index: string]: QuestionOriginal };
}

export enum SignInState {
  signIn = "Sign In",
  signUp = "Sign Up"
}

export function createMediaQuery(
  queryStr,
  callback: (x: boolean) => void,
  cdr: ChangeDetectorRef
): MediaQueryState {
  let mediaQueryObject: MediaQueryList;
  let mediaMatch = false;

  /* handling media query */
  let mediaQueryFunction: any = function(x: MediaQueryList) {
    mediaMatch = x.matches;
    callback(mediaMatch);
    cdr.detectChanges();
  };

  mediaQueryObject = window.matchMedia(queryStr);
  mediaQueryObject.addListener(mediaQueryFunction);

  return {
    dispose: () => {
      mediaQueryObject.removeListener(mediaQueryFunction);
    },
    isMediaMatched: () => mediaMatch,
    runMediaQuery: () =>
      setTimeout(() => mediaQueryFunction(mediaQueryObject), 0)
  };
}

/**
 * Toggle Full Screen
 */
function openFullscreen(elem: any) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((<any>document).mozCancelFullScreen) {
    (<any>document).mozCancelFullScreen();
  } else if ((<any>document).webkitExitFullscreen) {
    (<any>document).webkitExitFullscreen();
  } else if ((<any>document).msExitFullscreen) {
    (<any>document).msExitFullscreen();
  }
}

/**
 *
 * @param bool : true -> open Full Screen Mode
 * @param elem : element to open as full screen
 */
export function toggleFullScreen(
  bool: boolean,
  elem = document.documentElement
) {
  if (bool) openFullscreen(elem);
  else closeFullscreen();
}

/**
 * Creates an overlay based sidebar toggle function
 */

export function createSideBarStateOverlay(
  sidebar: HTMLElement,
  fixedOverlay: HTMLElement,
  mediaQueryState: MediaQueryState
): (x: boolean, force: boolean, element: HTMLElement) => void {
  return (x: boolean, force: boolean = null, element: HTMLElement) => {
    /** support for "li" being clicked when screen is small
     *  then one should close the sidebar.
     *  So add a click handlar to parent "ul".
     */
    if (
      element &&
      element.nodeName == "LI" &&
      mediaQueryState.isMediaMatched()
    ) {
      return openClose(true);
    }
    /**
     * open/close using overlay or toggler
     */
    if (force) {
      if (sidebar.classList.contains("sidebar-closed")) {
        return openClose(false, mediaQueryState.isMediaMatched());
      } else {
        return openClose(true);
      }
    }
    /**
     * open/close using media query
     */
    openClose(x, x);
    /**
     * main handler
     * @param toClose if true close the sidebar.
     * @param isMediaMatched is media query matched.
     */
    function openClose(toClose: boolean, isMediaMatched: boolean = false) {
      if (toClose) {
        sidebar.classList.add("sidebar-closed");
        fixedOverlay.style.display = "none";
      } else {
        sidebar.classList.remove("sidebar-closed");
        isMediaMatched ? (fixedOverlay.style.display = "block") : null;
      }
    }
  };
}

/**
 * callback code for special accordian click.
 * Also does state management
 */
export function createAccordianState() {
  let prevAccorElem: HTMLElement = null,
    callback = (elem: HTMLElement) => {
      let ct = <HTMLElement>elem.querySelector(".card-status-container");
      if (ct.style.transform == "rotate(90deg)")
        ct.style.transform = "rotate(-90deg)";
      else ct.style.transform = "rotate(90deg)";
      //code for prevAccorElem
      if (
        prevAccorElem &&
        prevAccorElem != ct &&
        prevAccorElem.style.transform == "rotate(90deg)"
      )
        prevAccorElem.style.transform = "rotate(-90deg)";
      prevAccorElem = ct;
    };
  return callback;
}

//filetype order should remain same
export const FILES = {
  image: ["jpg", "png", "jpeg"]
};

/**
 *
 * Returns @boolean or @null
 */
export function isValidImage(file: File) {
  let fileTypes = FILES.image;
  if (file) {
    let extension = file.name
      .split(".")
      .pop()
      .toLowerCase();
    let isSuccess = fileTypes.indexOf(extension) > -1;
    return isSuccess;
  }
  return null;
}

export function rtnInputAcceptVal(exts: string[], type: string) {
  let accept = "";
  exts.forEach(t => (accept += `${type}/${t}, `));
  accept = accept ? accept.slice(0, accept.length - 2) : `${type}/*`;
  return accept;
}

/** A hero's name can't match the given regular expression */
export function passValidator(
  regex: RegExp,
  rtnSigningState: () => SignInState,
  errorName:string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (rtnSigningState() == SignInState.signUp) {
      const forbidden = regex.test(control.value), errorObj={};
      errorObj[errorName] = {value: control.value}
      return !forbidden ? errorObj : null;
    } else return null;
  };
}

/** A hero's name can't match the given regular expression */
export function requiredValidator(
  rtnSigningState: () => SignInState,
  errorName:string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (rtnSigningState() == SignInState.signUp) {
      const forbidden = control.value!=null?(<string>control.value).trim():null,
      errorObj={};
      errorObj[errorName] = {value: control.value}
      return forbidden=="" ? errorObj : null;
    } else return null;
  };
}
