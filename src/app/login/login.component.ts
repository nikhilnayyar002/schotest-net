import { Component, OnInit } from "@angular/core";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";
import { BackendStatus } from "../shared/global";
import { Store, select } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { SetAppState } from "../state/state.actions";
import { Router } from "@angular/router";
import { tap, take } from "rxjs/operators";
import { AppState } from "../state/app.state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  configData = config;
  backendError: string;
  loggingIn: boolean = false;

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    psw: ["", [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private ms: AuthService,
    private store: Store<GLobalState>,
    private router: Router
  ) {}

  get email(): any {
    return this.form.get("email") as FormControl;
  }
  get psw(): any {
    return this.form.get("psw") as FormControl;
  }

  ngOnInit(): void {
    this.store
      .select(state => state.app)
      .pipe(take(1))
      .subscribe(appState => {
        if (appState.loggedIn) this.router.navigate(["/dashboard"]);
        /* if false means token expired */ else if (
          this.ms.isUserPayloadValid()
        )
          /**
           * token is not expired use it.
           */
          this.ms
            .userProfileHandled()
            .pipe(take(1))
            .subscribe((status: BackendStatus) => {
              console.log(1);
              this.store.dispatch(
                SetAppState({
                  app: {
                    user: status.user,
                    loggedIn: status.status
                  }
                })
              );
              this.router.navigate(["/dashboard"]);
            });
        /**
         * Refresh token and log in if password is there
         */ else if (appState.cred && appState.loggedIn)
          this.ms
            .authenticate(appState.cred.email, appState.cred.password)
            .pipe(take(1))
            .subscribe((status: BackendStatus) => {
              console.log(2);
              this.store.dispatch(
                SetAppState({
                  app: {
                    user: status.user,
                    loggedIn: status.status
                  }
                })
              );
              this.router.navigate(["/dashboard"]);
            });
      });
  }

  submit() {
    this.loggingIn = true;
    this.ms
      .authenticate(this.email.value, this.psw.value)
      .pipe(
        take(1),
      )
      .subscribe(
        (status: BackendStatus) => {
          this.loggingIn = false  /** set logged in to false */
          this.store.dispatch(
            SetAppState({
              app: {
                user: status.user,
                loggedIn: status.status,
                cred: { email: this.email.value, password: this.psw.value }
              }
            })
          );
          this.router.navigate(["/dashboard"]);
        },
        (error: string) => {
          this.loggingIn = false  /** set logged in to false */
          this.backendError = error;
        }
      );
  }
}
