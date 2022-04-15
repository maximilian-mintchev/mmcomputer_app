import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      this.oauthService.initLoginFlow();
      return false;
    }
  }
  
  // constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.jwtAuth.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(["/sessions/signin"], {
  //       queryParams: {
  //         return: state.url
  //       }
  //     });
  //     return false;
  //   }
  // }
}
