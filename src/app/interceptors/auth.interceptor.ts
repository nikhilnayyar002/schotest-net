import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "../auth.service";

 
@Injectable() 
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(
    private auth:AuthService
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let ignoreUrl = "http://localhost:3000/auth/authenticate";

    if(req.url != ignoreUrl) {

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
        req = req.clone({
          headers: req.headers.set('Authorization', "Bearer "+this.auth.getAuthorizationToken())
        });
    }
   
    return next.handle(req);
  }
}