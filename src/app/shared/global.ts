import { ChangeDetectorRef } from "@angular/core";
import { User } from '../modals/user';

export interface MediaQueryState {
  dispose: () => void;
  isMediaMatched: () => boolean;
  runMediaQuery: () => void;
}
export interface BackendStatus {
  status: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface Credentials {
  email: string;
  password: string;
};

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
): (x: boolean, force: boolean) => void {
  return (x: boolean, force: boolean = null) => {
    if (force) {
      if (sidebar.classList.contains("sidebar-closed")) {
        return openClose(false, mediaQueryState.isMediaMatched());
      } else {
        return openClose(true);
      }
    }
    openClose(x, x);
    function openClose(toOpen: boolean, isMediaMatched: boolean = false) {
      if (toOpen) {
        sidebar.classList.add("sidebar-closed");
        fixedOverlay.style.display = "none";
      } else {
        sidebar.classList.remove("sidebar-closed");
        isMediaMatched ? (fixedOverlay.style.display = "block") : null;
      }
    }
  };
}

