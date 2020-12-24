import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {


  //Soruce: https://github.com/bbachi/keycloak-todos/blob/master/src/config/authconfig.service.ts
  private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() { return this._decodedAccessToken; }
    get decodedIDToken() { return this._decodedIDToken; }

    constructor(
      private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig,
    ) {}

    async initAuth(): Promise<any> {
      return new Promise((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
        
        // subscribe to token events
        this.oauthService.events
          .pipe(filter((e: any) => {
            console.log(e);
            return e.type === 'token_received';
          }))
          .subscribe(() => this.handleNewToken());
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

        this.oauthService.loadDiscoveryDocumentAndTryLogin().then((isLoggedIn) => {
          console.log(isLoggedIn);
          if (isLoggedIn) {
                this.oauthService.setupAutomaticSilentRefresh();
                resolveFn(isLoggedIn);
                console.log(this.oauthService.hasValidAccessToken());
                if(this.decodedAccessToken) {
                  this.oauthService.loadUserProfile().then((data) => {
                    console.log(data);
                  });
                }
                if(this.oauthService.hasValidAccessToken()) {
                  console.log(this.oauthService.getIdentityClaims());
                }
              } else {
                resolveFn(isLoggedIn);
                // resolveFn(true)
                // this.oauthService.initImplicitFlow();
                // this.oauthService.initLoginFlow();
                // rejectFn();
              }
        });
        
      });
    }
  
    private handleNewToken() {
      this._decodedAccessToken = this.oauthService.getAccessToken();
      this._decodedIDToken = this.oauthService.getIdToken();
    }
}
