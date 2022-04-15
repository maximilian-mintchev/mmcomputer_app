import { ShopService } from './views/shop/shop.service';
import { CloudService } from './shared/services/cloud.service';
import { AuthConfigModule } from './../config/auth.config.module';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GestureConfig } from '@angular/material/core';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
// import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import { init_catalog } from 'app.init';
import { AgbComponent } from './views/agb/agb.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthConfigModule,
    SharedModule,
    HttpClientModule,
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: ['http://localhost:9090/api'],
    //     sendAccessToken: true
    //   }
    // }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent, AgbComponent],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { 
      provide: APP_INITIALIZER, 
      useFactory: init_catalog, 
      deps: [ CloudService, ShopService ], 
      multi: true
    },
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
