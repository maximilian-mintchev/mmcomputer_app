import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private router: Router, private oauthService: OAuthService, private snack: MatSnackBar, private jwt: JwtAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // route.data.includes(userInfo.realm_access.roles) 
    console.log(route);
    console.log(state);  
    const userInfo: UserInfo = this.jwt.getUserInfo();
    const requiredRoles: [] = route.data.roles;
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    } else if (
      userInfo &&
      // route.data &&
      // route.data.roles &&
      // (userInfo.realm_access.roles as []).every((role) => requiredRoles.)
      requiredRoles.every((role) => userInfo.realm_access.roles.includes(role))
      // requiredRoles.includes()
    ) {
      return true;
    }
    else {
      this.snack.open('Zugang nur für registrierte Händler.', 'Als Handler registrieren');
      this.router.navigate(['shop']);
      return false;
    }
  }



  // constructor(private router: Router, private jwtAuth: JwtAuthService, private snack: MatSnackBar) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   var user = this.jwtAuth.getUser();

  //   if (
  //     user &&
  //     route.data &&
  //     route.data.roles &&
  //     route.data.roles.includes(user.role)
  //   ) {
  //     return true;
  //   } else {
  //     this.snack.open('You do not have access to this page!', 'OK');
  //     return false;
  //   }
  // }
}
