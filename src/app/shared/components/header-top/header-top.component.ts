import { ShopService, CartData } from './../../../views/shop/shop.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, Input, OnDestroy, Renderer2, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, AfterViewInit, AfterViewChecked ,OnDestroy {
  layoutConf: any;
  public userProfile: any;
  menuItems:any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }];
  public amountCartItems: number;

  @Input() notificPanel;
  constructor(
    public layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private oauthService: OAuthService,
    private shopService: ShopService,
    private cdr: ChangeDetectorRef
  ) { 
    
  }
  ngAfterViewChecked(): void {
    
  }


  ngAfterViewInit(): void {
    // this.cartData = this.shopService.cartData;
   
    
  }

  

  ngOnInit() {
    
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$
    .subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      let limit = 5
      let mainItems:any[] = res.slice(0, limit)
      if(res.length <= limit) {
        return this.menuItems = mainItems
      }
      let subItems:any[] = res.slice(limit, res.length - 1)
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      })
      this.menuItems = mainItems
    })
    if(this.oauthService.hasValidAccessToken()) {
      this.oauthService.loadUserProfile().then((userProfile) => {
        this.userProfile = userProfile;
        console.log(userProfile);
      });
    }

    // this.shopService.getCart().subscribe((cartItems) => {
    //   this.amountCartItems = cartItems.length;
    //   alert("Okaaaaay. Let's go!");
    // });

   
   
   
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }
  setLang() {
    this.translate.use(this.currentLang)
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({matTheme: theme.name})
  }
  public logoff() {
    this.oauthService.logOut();
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
  isLtMd(): boolean {
    return this.layout.isLtMd();
  }
  isGtSm(): boolean {
    return this.layout.isGtSm();
  }
  isLtSm(): boolean {
    return this.layout.isLtSm();
  }
  login(): void {
    this.oauthService.initLoginFlow();
  }
  isAuth(): boolean {
    if(this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      return false;
    }
  }

  getRole():string {
    if(this.jwtAuth.getRole()) {
      return this.jwtAuth.getRole();
    }
  }

  

  
}
