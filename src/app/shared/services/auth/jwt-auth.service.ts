import { AuthConfig, NullValidationHandler, ValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './../../../../config/auth.config';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay, filter } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError, Subject } from "rxjs";
import { environment } from "environments/environment";

// ================= only for demo purpose ===========
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

const DEMO_USER: User = {
  id: "5b700c45639d2c0c54b354ba",
  displayName: "Watson Joyce",
  role: "SA",
};
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  userInfo: UserInfo;
  user$ = (new BehaviorSubject<UserInfo>(null));
  tokenEvents: Subject<any> = new Subject<any>();
  signingIn: Boolean;
  return: string;
  JWT_TOKEN: string;
  APP_USER: string;

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OAuthService
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');

      this.oauthService.events
          .pipe(filter((e: any) => {
            console.log(e);
            return e.type === 'token_received';
          }))
          .subscribe(() => this.handleNewToken());
  }
  //(username, password)
  public signin():void {
    // this.oauthService.initLoginFlow();
    this.oauthService.loadDiscoveryDocumentAndLogin().then((loggedIn: boolean) => {
      if(loggedIn) {
        this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
          this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, loggedIn);
        });
        this.oauthService.setupAutomaticSilentRefresh();
      }  else {
        this.setUserAndToken(null, null, false);
      }
    })
    // return of({token: DEMO_TOKEN, user: DEMO_USER})
    //   .pipe(
    //     delay(1000),
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    // this.signingIn = true;
    // return this.http.post(`${environment.apiURL}/auth/local`, { username, password })
    //   .pipe(
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );
  }

  trySignin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then((isLoggedIn) => {
        if (isLoggedIn) {
              this.oauthService.setupAutomaticSilentRefresh();
              if(this.oauthService.hasValidAccessToken()) {
                this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
                  this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, this.oauthService.hasValidAccessToken());
                });
              } else {
                this.setUserAndToken(null, null, false);
              }
              resolve(isLoggedIn);
            } else {
              resolve(isLoggedIn);
            }
      });
    });
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid(): boolean {
    if(this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      return false;
    }
    // return of(DEMO_USER)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       this.signingIn = false;
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       return of(error);
    //     })
    //   );
    
    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  handleNewToken() {
    if(this.checkTokenIsValid()) {
      this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
        this.setUserAndToken(this.oauthService.getAccessToken(), userInfo, this.oauthService.hasValidAccessToken());
      });
    }
  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.oauthService.logOut();
  }


  public configureAuthSetup(authConfig: AuthConfig, storage: Storage, validationHandler: ValidationHandler) {
    this.oauthService.configure(authConfig);
        this.oauthService.setStorage(storage);
        this.oauthService.tokenValidationHandler = validationHandler;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUserInfo(): UserInfo {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, userInfo: UserInfo, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.userInfo = userInfo;
    this.user$.next(userInfo);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, userInfo);
  }

  getRole(): string {
    const roles: Array<string> = this.userInfo.realm_access.roles;
    if(roles.includes('app-super-admin')) {
      return 'Super Admin';
    } else if (roles.includes('app-admin')) {
      return 'Admin';
    } else if(roles.includes('app-mitarbeiter')) {
      return 'Mitarbeiter';
    } else if(roles.includes('app-business-user')) {
      return 'Händler';
    } else if (roles.includes('app-user')) {
      return 'Kunde';
    }
  }


}
