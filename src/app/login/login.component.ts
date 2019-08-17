import { Component, OnInit } from "@angular/core";
import config from "src/data/config";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";
import {
  BackendStatus,
  passValidator,
  SignInState,
  requiredValidator
} from "../shared/global";
import { Store } from "@ngrx/store";
import { GLobalState } from "../shared/global.state";
import { SetAppState } from "../state/state.actions";
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

const passRegex = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  configData = config;
  backendError: string;
  loggingIn: boolean = false;

  submitBtnText: SignInState = SignInState.signIn;
  SignInState = SignInState;

  form = this.fb.group({
    userName: [
      "",
      [requiredValidator(() => this.submitBtnText,"userNameValidator")]
    ],
    email: ["", [Validators.required, Validators.email]],
    psw: [
      "",
      [
        Validators.required,
        passValidator(
          passRegex,
          () => this.submitBtnText,
          "passSignUpValidator"
        )
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<GLobalState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /**
     * Resolving
     */
    let data = this.route.snapshot.data;
    if (data.status)
      this.router.navigate([this.auth.lastUrlLoaded], {
        queryParams: this.auth.queryParam
      });
  }

  get email(): any {
    return this.form.get("email") as FormControl;
  }
  get psw(): any {
    return this.form.get("psw") as FormControl;
  }
  get userName(): any {
    return this.form.get("userName") as FormControl;
  }

  setSignInState(state:SignInState) {
    this.form.reset()
    this.submitBtnText = state
  }


  login() {
    this.loggingIn = true;
    this.auth
      .authenticate(this.email.value, this.psw.value)
      .subscribe(
        (status: BackendStatus) => {
          this.loggingIn = false; /** set logged in to false */
          this.store.dispatch(
            SetAppState({
              app: {
                user: status.user,
                loggedIn: status.status,
                cred: { email: this.email.value, password: this.psw.value }
              }
            })
          );

          this.router.navigate([this.auth.lastUrlLoaded], {
            queryParams: this.auth.queryParam
          });
        },
        (error: string) => {
          this.loggingIn = false; /** set logged in to false */
          this.backendError = error;
        }
      );
  }

  register() {
    this.loggingIn = true;
    this.auth
      .register(this.userName.value, this.email.value, this.psw.value)
      .subscribe(
        (status: BackendStatus) => {
          this.loggingIn = false;
          this.backendError = '';
          this.submitBtnText = SignInState.signIn
        },
        (error: string) => {
          this.loggingIn = false; 
          this.backendError = error;
        }
      );
  }


}
