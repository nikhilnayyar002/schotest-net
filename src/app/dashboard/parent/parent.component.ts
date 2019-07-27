import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import config from "../../../data/config";
import { createMediaQuery, MediaQueryState, createSideBarStateOverlay } from "../../shared/global";
import { GLobalState } from "../../shared/global.state";
import { Store, select } from "@ngrx/store";
import { AuthService } from "../../auth.service";
import { SetAppState } from "../../state/state.actions";
import { Router} from "@angular/router"
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/modals/user';


/**
 * @Creating_the_sidebar
 *
 * 1. Create class .sidebar and .sidebar-closed.
 * 2. Create "mediaQueryState" object.
 * 3. Reference elements "fixedOverlay" and "sidebar"
 * 4. call "createSideBarStateOverlay" to create "toggleSideBar" function
 * 5. Call it through "mediaQueryState" object as : this.toggleSideBar(x, null)
 * 6. Call it through "Toggler Button" as : this.toggleSideBar(null, true)
 * 7. Optionally set overlay click to : this.toggleSideBar(null, true)
 * 8. Also find in components html where things are being worked.
 */
@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.scss"]
})
@AutoUnsubscribe()
export class ParentComponent {
  configData = config;
  @ViewChild("fixedOverlay", { static: false })
  private fixedOverlay: ElementRef;
  @ViewChild("sidebar", { static: false }) private sidebar: ElementRef;
  user:Observable<UserProfile> = this.store.select(state => state.app.user);

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
