import { ShopService } from './views/shop/shop.service';
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';

import { filter } from 'rxjs/operators';
import { UILibIconService } from './shared/services/ui-lib-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'MMComputer';
  pageTitle = '';

  // authConfig: AuthConfig = {
  //   issuer: 'http://localhost:8080/auth/realms/mmcomputer',
  //   redirectUri: window.location.origin + '/shop',
  //   clientId: 'app-mmcomputer',
  //   // scope: 'profile email',
  //   scope: 'openid profile email offline_access',

  //   responseType: 'code',
  //   // at_hash is not present in JWT token
  //   disableAtHashCheck: true,
  //   showDebugInformation: true,

  // };
  
  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService,
  ) {
    iconService.init();
    // this.configure();
  }

  ngOnInit() {
    this.changePageTitle();
  }

  ngAfterViewInit() {
  }

  
  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => `${partA} > ${partI}`);
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
