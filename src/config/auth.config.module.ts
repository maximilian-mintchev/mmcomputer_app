import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';

import { AuthConfigService } from './auth-config.service';
// import { authConfig, OAuthModuleConfig } from './auth.config';
import { init_app } from '../app.init';
import { authConfig, oauthModuleConfig, OAuthModuleConfig } from './auth.config';

@NgModule({
  imports: [ HttpClientModule, OAuthModule.forRoot(oauthModuleConfig) ],
  providers: [
    AuthConfigService,
    { provide: AuthConfig, useValue: authConfig },
    OAuthModuleConfig,
    { 
      provide: APP_INITIALIZER, 
      useFactory: init_app, 
      deps: [ AuthConfigService ], 
      multi: true
    }
  ]
})
export class AuthConfigModule { }