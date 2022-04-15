import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {


  //Inspiration Soruce: https://github.com/bbachi/keycloak-todos/blob/master/src/config/authconfig.service.ts
  // private _decodedAccessToken: any;
  //   private _decodedIDToken: any;
    // get decodedAccessToken() { return this._decodedAccessToken; }
    // get decodedIDToken() { return this._decodedIDToken; }
  
    constructor(
      // private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig,
      private jwt: JwtAuthService
    ) {}

    async initAuth(): Promise<any> {
      return new Promise((resolveFn, rejectFn) => {
        // setup oauthService
        this.jwt.configureAuthSetup(this.authConfig, localStorage, new NullValidationHandler());
        //trySignin
        this.jwt.trySignin().then(() => resolveFn(true));
        // this.oauthService.configure(this.authConfig);
        // this.oauthService.setStorage(localStorage);
        // this.oauthService.tokenValidationHandler = new NullValidationHandler();
        
        // subscribe to token events
        
        
        // disabling keycloak for now
        //  resolveFn(true);
        // continue initializing app or redirect to login-page
        
        // this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
        //   if (isLoggedIn) {
        //     this.oauthService.setupAutomaticSilentRefresh();
        //     resolveFn(true);
        //   } else {
        //     // resolveFn(true)
        //     // this.oauthService.initImplicitFlow();
        //     // this.oauthService.initLoginFlow();
        //     // rejectFn();
        //   }
        // });

        // this.oauthService.loadDiscoveryDocumentAndTryLogin().then((isLoggedIn) => {
        //   console.log(isLoggedIn);
        //   if (isLoggedIn) {
        //         this.oauthService.setupAutomaticSilentRefresh();
        //         console.log(this.oauthService.hasValidAccessToken());
        //         if(this.oauthService.hasValidAccessToken()) {
        //           this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
        //             // console.log(data);
        //             this.jwt.setUserAndToken(this.oauthService.getAccessToken(), userInfo, this.oauthService.hasValidAccessToken());
        //           });
        //         } else {
        //           this.jwt.setUserAndToken(null, null, false);
        //         }
        //         // if(this.oauthService.hasValidAccessToken()) {
        //         //   console.log(this.oauthService.getIdentityClaims());
        //         // }
        //         resolveFn(isLoggedIn);
        //       } else {
        //         // resolveFn(isLoggedIn);
        //         // resolveFn(true)
        //         // this.oauthService.initImplicitFlow();
        //         // this.oauthService.initLoginFlow();
        //         rejectFn();
        //       }
        // });
        
      });
    }
  
    // private handleNewToken() {
    //   this._decodedAccessToken = this.oauthService.getAccessToken();
    //   this._decodedIDToken = this.oauthService.getIdToken();
    // }
}
