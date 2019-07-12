import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import config from "src/data/config";
import {
  MediaQueryState,
  createMediaQuery,
  createSideBarStateOverlay
} from "src/app/shared/global";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { GLobalState } from "src/app/shared/global.state";
import { SetAppState } from "src/app/state/state.actions";
import { AuthService } from "src/app/auth.service";

/**
 * @Creating_the_sidebar
 *
 * 1. Create class .sidebar and .sidebar-closed.
 * 2. Create "mediaQueryState" object.
 * 3. Reference elements "fixedOverlay" and "sidebar"
 * 4. call "createSideBarStateOverlay" to create "toggleSideBar" function
 * 5. Call it through "mediaQueryState" object as : this.toggleSideBar(x, null)
 * 6. Call it through "Toggler Button" as : this.toggleSideBar(null, true)
 */
@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
export class ParentComponent {
  configData = config;
  @ViewChild("fixedOverlay", { static: false })
  private fixedOverlay: ElementRef;
  @ViewChild("sidebar", { static: false }) private sidebar: ElementRef;

  mediaQueryState: MediaQueryState = createMediaQuery(
    "(max-width: 900px)",
    (x: boolean) => this.toggleSideBar(x, null),
    this.cdr
  );

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<GLobalState>,
    private auth: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.toggleSideBar = createSideBarStateOverlay(
      this.sidebar.nativeElement,
      this.fixedOverlay.nativeElement,
      this.mediaQueryState
    );
    this.mediaQueryState.runMediaQuery();
  }

  toggleSideBar: (x: boolean, force: boolean) => void;

  logout() {
    this.auth.logout();
    this.store.dispatch(
      SetAppState({
        app: {
          user: null,
          loggedIn: false
        }
      })
    );
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    this.mediaQueryState.dispose();
  }
}
