import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http";
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
        req = req.clone({
          headers: new HttpHeaders({
            'x-refresh':  'true',
            'Authorization': "Bearer "+this.auth.getAuthorizationToken()
          })

        });
    }
    return next.handle(req);
  }

}