import { ActivatedRoute } from '@angular/router';
import { CatalogNode } from './../../../shared/models/catalog-node.model';
import { debounceTime, delay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopService, CartItem } from '../shop.service';
import { Product } from '../../../shared/models/product.model';
import { ProductPage } from '../../../shared/models/product-page.model';

import { CatalogFlatNode } from '../../../shared/models/catalog-flat-node.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { LayoutService } from '../../../shared/services/layout.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { CloudService } from '../../../shared/services/cloud.service';
import { Params, Router, RouterEvent } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { MatInput } from '@angular/material/input';



const TREE_DATA: FoodNode[] = [
  {
    name: 'Apple und Co.',
    children: [
      { name: 'Apple Desktops' },
      { name: 'Apple Notebooks' },
      { name: 'Apple iPad' },
      { name: 'Apple iPod' },
      { name: 'Apple Speichererweiterungen' },
      { name: 'Apple Software' },
      { name: 'Apple Zubehör' },
    ]
  },
  {
    name: 'PC-Systeme',
    children: [
      { name: 'M&M Bestseller PCs' },
      { name: 'M&M Gamer PCs' },
      { name: 'M&M Professional PCs' },
      { name: 'M&M Mini PCs' },
      { name: 'M&M Value/Discount PCs' },
      { name: 'M&M Aufrüst PCs' },
      { name: 'Andere Anbieter' },
      { name: 'All In One PC-Systeme' },
      {
        name: 'Barebones',
        children: [
          { name: 'Zubehör' }
        ]
      }
    ]
  },
  {
    name: 'Notebooks, Tablets und Co.',
    children: [
      {
        name: 'Notebooks',
        children: [
          { name: '30cm (12 Zoll)' },
          { name: '33cm (13 Zoll)' },
          { name: '36cm (14 Zoll)' },
          { name: '38cm (15 Zoll)' },
          { name: '41cm (16 Zoll)' },
          { name: '43cm (17 Zoll)' },
          { name: '46cm (18 Zoll)' },

        ]
      },
      {
        name: 'Netbooks',
        children: [
          { name: '<11 Zoll' },
          { name: '11 Zoll  ' },
          { name: '12 Zoll' }
        ]
      },
      {
        name: 'Tablet-PCs',
        children: [
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Smartphones und Co.',
        children: [
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Notebooktaschen',
      },
      {
        name: 'Notebookzubehör',
        children: [
          { name: 'RAM-Erweiterungen' },
          { name: 'PCMCIA' },
          { name: 'portable Drucker' },
          { name: 'Akku/Netzteile' },
          { name: 'Docking' },
          { name: 'Garantieerweiterungen' },
          { name: 'sonstiges' },
        ]
      },
      {
        name: 'Navigation',
        children: [
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Taschenrechner',
      },
      {
        name: 'E-Book-Reader',
        children: [
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Organizer/PDA',
        children: [
          { name: 'Zubehör' },
        ]
      },
    ]
  },
  {
    name: 'PC-Komponenten',
    children: [
      {
        name: 'Mainboards',
        children: [
          { name: 'AMD Socket AM3 Plus' },
          { name: 'AMD Socket AM4' },
          { name: 'AMD Socket FM2 Plus' },
          { name: 'AMD Socket TR4' },
          { name: 'Intel Socket 775' },
          { name: 'Intel Socket 1150' },
          { name: 'Intel Socket 1151' },
          { name: 'Intel Socket 1151-V2' },
          { name: 'Intel Socket 1155' },
          { name: 'Intel Socket 1200' },
          { name: 'Intel Socket 2011' },
          { name: 'Intel Socket 2011-V3' },
          { name: 'Intel Socket 2066' },
          { name: '...Zubehör' },
        ]
      },
      {
        name: 'Prozessoren',
        children: [
          { name: 'AMD Socket AM3' },
          { name: 'AMD Socket AM3 Plus' },
          { name: 'AMD Socket AM4' },
          { name: 'AMD Socket FM2' },
          { name: 'AMD Socket FM2 Plus' },
          { name: 'AMD Socket TR4' },
          { name: 'Intel Socket 1150' },
          { name: 'Intel Socket 1151' },
          { name: 'Intel Socket 1151-V2' },
          { name: 'Intel Socket 1155' },
          { name: 'Intel Socket 1200' },
          { name: 'Intel Socket 2011' },
          { name: 'Intel Socket 2011-V3' },
          { name: 'Intel Socket 2066' },
        ]
      },
      {
        name: 'Lüfter',
        children: [
          {
            name: 'CPU',
            children: [
              { name: 'Wärmeleitpaste' },
              { name: 'Zubehör' }
            ]
          },
          {
            name: 'Wasserkühlung',
            children: [
              { name: 'Zubehör' }
            ]
          },
          {
            name: 'Grafikkarten-Lüfter'
          },
          {
            name: 'RAM-Kühler'
          },
          {
            name: 'Festplatten-Lüfter'
          },
          {
            name: 'Gehäuse-Lüfter'
          },
          {
            name: 'sonstige'
          },
        ]
      },
      {
        name: 'Arbeitsspeicher (RAM)',
        children: [
          {
            name: 'für PC',
            children: [
              { name: 'DDR-RAM' },
              { name: 'DDR2-RAM' },
              { name: 'DDR3-RAM' },
              { name: 'DDR4-RAM' },
            ]
          },
          {
            name: 'für Notebook',
            children: [
              { name: 'DDR-RAM' },
              { name: 'DDR2-RAM' },
              { name: 'DDR3-RAM' },
              { name: 'DDR4-RAM' },
            ]
          },
          { name: 'RAM-Kühler' },
          { name: 'sonstige' },
        ]
      },
      {
        name: 'Grafikkarten',
        children: [
          { name: 'NVIDIA' },
          { name: 'AMD/ATI' },
          { name: 'Lüfter' },
          { name: '...Zubehör' }
        ]
      },
      { name: 'Controller' },
      { name: 'Soundkarten' },
      { name: 'Headsets' },
      {
        name: 'Gehäuse & Netzteile',
        children: [
          {
            name: 'PC-Gehäuse',
            children: [
              { name: 'MicroATX/Simline' },
              { name: 'Minitower' },
              { name: 'Miditower' },
              { name: 'Bigtower' },
              { name: 'Cube Case' },
              { name: 'Desktop' },
              { name: 'HTPC-Desktop' },
              { name: 'MiniITX' },
            ]
          },
          {
            name: 'Server-Gehäuse',
            children: [
              { name: 'Server Gehäuse' },
              {
                name: 'Server Schränke',
                children: [
                  { name: 'Zubehör' }
                ]
              },

            ]
          },
          { name: 'Festplattengehäuse' },
          { name: 'RAID-Zubehör' },
          { name: 'Zubehör' },
          {
            name: 'Netzteile',
            children: [
              { name: 'Zubehör' }
            ]
          },
        ]
      },
      {
        name: 'Eingabegeräte',
        children: [
          { name: 'Desktopbundles' },
          {
            name: 'Tastaturen',
            children: [
              { name: 'Zubehör' }
            ]
          },
          {
            name: 'Mäuse',
            children: [
              { name: 'Mauspads' },
              { name: 'Maus-Zubehör' }
            ]
          },
          { name: 'Presenter' },
          { name: 'Trackbälle' },
          { name: 'Gaming' },
          {
            name: 'Digitalisiertabletts',
            children: [
              { name: 'Zubehör' }
            ]
          },



        ]
      }
    ]
  },
  {
    name: 'Massenspreicher',
    children: [
      { name: 'Optische Laufwerke' },
      {
        name: 'Rohlinge',
        children: [
          { name: 'Zubehör' }
        ]
      },
      {
        name: 'SSD',
        children: [
          { name: '2,5 Zoll' },
          {
            name: 'M.2',
            children: [
              { name: 'NVMe' },
              { name: 'AHCI' }
            ]
          },
        ]
      },
      {
        name: 'Festplatten',
        children: [
          {
            name: 'intern',
            children: [
              { name: '1,8 Zoll' },
              { name: '2,5 Zoll' },
              { name: '3,5 Zoll' },
              {
                name: 'Zubehör',
                children: [
                  { name: 'Adapter' },
                  { name: 'Gehäuse' },
                  { name: 'Wechselrahmen' },
                  { name: 'Docking' },
                  { name: 'Einbaumaterial' },
                  { name: 'sonstiges' },
                ]
              },

            ]
          },
          {
            name: 'extern',
            children: [
              { name: '2,5 Zoll' },
              { name: '3,5 Zoll' },
              { name: 'Zubehör' },
            ]
          },
          {
            name: 'Wechselrahmen'
          }
        ]
      },
      { name: 'NAS-Systeme' },
      { name: 'Speicherkarten' },
      { name: 'USB-Sticks' },
      { name: 'Streamer' },
      {
        name: 'Wechselspeicher',
        children: [
          { name: 'Floppy & ZIP' },
          { name: 'REV' },
        ]
      },
      {
        name: 'Speichermedien',
        children: [
          { name: 'Streamerbänder' },
          { name: 'ZIP' },
          { name: 'sonstige' },
        ]
      },
      { name: 'Gehäuse' }
    ]
  },
  {
    name: 'Monitore/Scanner/Drucker',
    children: [
      {
        name: 'TFT-Displays',
        children: [
          { name: '< 17 Zoll' },
          { name: '17 Zoll' },
          { name: '19 Zoll' },
          { name: '22 Zoll' },
          { name: '24 Zoll' },
          { name: '27 Zoll' },
          { name: '> 27 Zoll' },
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Projektoren',
        children: [
          { name: 'Projektor-Zubehör' }
        ]
      },
      {
        name: 'Drucker',
        children: [
          { name: 'Kombiegeräte' },
          { name: 'Tintenstrahl' },
          {
            name: 'Laser',
            children: [
              { name: 'Monochrom' },
              { name: 'Farbe' },
            ]
          },
          { name: 'Label' },
          {
            name: 'Tinte',
            children: [
              { name: 'original' },
              { name: 'kompatibel' },
            ]
          },
          {
            name: 'Toner',
            children: [
              { name: 'original' },
              { name: 'kompatibel' },
            ]
          },
          { name: '3D-Filamente' },
          { name: 'Farbbänder' },
          { name: 'Etiketten' },
          { name: '(Foto-)Papier' },
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'Scanner',
        children: [
          { name: 'Barcode' },
          { name: 'DIA-/Filmscanner' },
          { name: 'Einzug' },
          { name: 'Flachbett' },
          { name: 'Kopiergeräte' },
          { name: 'Zubehör' },
        ]
      }
    ]
  },
  {
    name: 'Digitalkameras',
    children: [
      { name: 'Digitale Kompaktkameras' },
      { name: 'Digitale SLR-Kameras' },
      {
        name: 'Kamerazubehör',
        children: [
          { name: 'Reader/Adapter' },
          { name: 'Akkus/Batterien' },
          { name: 'Ladegeräte/Netzteile' },
          { name: 'Objektive' },
          { name: 'Filter' },
          { name: 'Blenden' },
          { name: 'Taschen' },
          { name: 'Fotoalben' },
          { name: 'Bilderrahmen' },
          { name: 'sonstiges' },

        ]
      },
      { name: 'Speichermedien' }
    ]
  },
  {
    name: 'Audio/Video/TV',
    children: [
      {
        name: 'LCD-TV',
        children: [
          { name: '< 32 Zoll' },
          { name: '32 Zoll' },
          { name: '37 Zoll' },
          { name: '40 Zoll' },
          { name: '42 Zoll' },
          { name: '46 Zoll' },
          { name: '> 46 Zoll' },
        ]
      },
      { name: 'Plasmabildschirme' },
      { name: 'Digitale Bilderrahmen' },
      {
        name: 'Empfangstechnik',
        children: [
          { name: 'Zubehör' }
        ]
      },
      { name: 'Radios' },
      { name: 'Kompaktanlagen' },
      { name: 'DVD-Player' },
      {
        name: 'Mikrofone',
        children: [
          { name: 'Zubehör' }
        ]
      },
      {
        name: 'Lautsprecher',
        children: [
          { name: 'Aktivboxen' },
          { name: 'HIFI-Lautsprecher (passiv)' },
          { name: 'Zubehör' }
        ]
      },
      {
        name: 'Spielekonsolen',
        children: [
          { name: 'Playstation' },
          { name: 'Nintendo Wii' },
          { name: 'XBOX' }
        ]
      },
      {
        name: 'HomeCinema',
        children: [
          { name: 'Fernbedienungen' }
        ]
      },
      { name: 'Media-Player' },
      { name: 'Portable Audio/MP3' },
      { name: 'Ferngläser und Teleskope' },
      { name: 'Videokameras' },
      { name: 'Action-Kameras' },
      { name: 'Webcams' },
      {
        name: 'Netzwerkkameras',
        children: [
          { name: 'Zubehör' }
        ]
      },
      { name: 'Videokarten' },
      {
        name: 'TV-Karten (intern/extern)',
        children: [
          { name: 'Zubehör' }
        ]
      },
      { name: 'sonstiges Zubehör' },
    ]
  },
  {
    name: 'Netzwerk/Kommunikation',
    children: [
      {
        name: 'Netzwerk',
        children: [
          { name: 'Lan-Adapter/Karten' },
          {
            name: 'Wireless Lan',
            children: [
              { name: 'Adapter' },
              { name: 'Repeater' },
              { name: 'Accesspoints' },
              { name: 'Antennen' },
              { name: 'Antennenzubehör' },
            ]
          },
          { name: 'Bluetooth' },
          { name: 'Powerline/HomePlug' },
          { name: 'Printserver' },
          {
            name: 'NAS-Systeme',
            children: [
              { name: 'NAS-Zubehör' }
            ]
          },
          {
            name: 'USV',
            children: [
              { name: 'Zubehör' }
            ]
          },
          {
            name: 'Hubs / Switches',
            children: [
              { name: 'Zubehör' }
            ]
          },
          { name: 'Patchfelder' },
          {
            name: 'Router',
            children: [
              { name: 'Zubehör' }
            ]
          },
          { name: 'Extender' },
          { name: 'Konverter' },
          { name: 'Dosen' },
          { name: 'PoE' },
          { name: 'Module' },
          { name: 'Netzwerkzubehör' },
          { name: 'Netzwerk-Kabel' },
        ]
      },
      {
        name: 'Modem/ISDN/DSL',
        children: [
          { name: 'Modems' },
          { name: 'ISDN-Adapter' },
          { name: 'DSL-Modems' },
          { name: 'Modem/ISDN Zubehör' },
          { name: 'Modem/ISDN Kabel' },
        ]
      },
      {
        name: 'Telefon/Fax',
        children: [
          {
            name: 'Handys',
            children: [
              { name: 'Handy-Zubehör' }
            ]
          },
          { name: 'Telefone' },
          { name: 'TK-Anlagen' },
          { name: 'Telefon/Fax-Zubehör' },
          {
            name: 'Headsets',
            children: [
              { name: 'Headset-Zubehör' }
            ]
          },
          { name: 'Fax/Kombigeräte' },
          { name: 'Verbrauchsmaterialien' },
          { name: 'Telefon/Fax-Kabel' },
        ]
      },
      { name: 'Voice over IP' },
      { name: 'SmartWatches' },
      {
        name: 'SmartHome',
        children: [
          { name: 'Beleuchtung' },
          { name: 'Steckdosen' },
          { name: 'Schalter/Dimmer' },
          { name: 'Überwachung/Sicherheit' },
          { name: 'Alarme/Sensoren' },
          { name: 'sonstiges' },
        ]
      },
      {
        name: 'Kabel/Zubehör',
        children: [
          { name: 'Netzwerk-Zubehör' },
          { name: 'Module' },
          { name: 'Netzwerk-Kabel' },
          { name: 'Telefon/Faxkabel' },
          { name: 'Telefon/Fax Zubehör' },
        ]
      },
    ]
  },
  {
    name: 'Software',
    children: [
      { name: 'Betriebssysteme' },
      { name: 'Lizenzen' },
      { name: 'Utilities/Sicherheit' },
      { name: 'Büro/Organisation' },
      { name: 'Datenbanken/Entwicklung' },
      { name: 'Grafik/DTP' },
      { name: 'Multimedia/Webpublishing' },
      { name: 'Videobearbeitung' },
      { name: 'Soundbearbeitung' },
      { name: 'CAD/Modeling' },
      { name: 'Bildung/Entertainment' },
      { name: 'sonstiges' },
    ]
  },
  {
    name: 'Adapter/Kabel/sonstiges',
    children: [
      {
        name: 'Batterien & Ladegeräte',
        children: [
          { name: 'Batterien' },
          { name: 'Akkus' },
          { name: 'Ladegeräte' },
        ]
      },
      { name: 'Adapter/Ladegeräte' },
      {
        name: 'Kabel',
        children: [
          { name: 'Displayport' },
          { name: 'DVI' },
          { name: 'Firewire' },
          { name: 'HDMI' },
          { name: 'IDE' },
          { name: 'ISDN' },
          {
            name: 'Netzwerk',
            children: [
              { name: 'Kat.5 (100MBit)' },
              { name: 'Kat. 6 (1000MBit)' },
              { name: 'Kat.7 (1000MBit)' },
            ]
          },
          { name: 'parallel' },
          { name: 'PS2 (Tastatur)' },
          { name: 'Toslink (optisch)' },
          { name: 'SATA' },
          { name: 'eSATA' },
          { name: 'SCSI' },
          { name: 'seriell' },
          { name: 'Stromkabel' },
          { name: 'Stromkabel (intern)' },
          { name: 'Telefon' },
          { name: 'USB' },
          { name: 'VGA' },
        ]
      },
      { name: 'Steckdosenleisten' },
      { name: 'HUBs/Verteiler' },
      {
        name: 'Dataswitches',
        children: [
          { name: 'Zubehör' },
        ]
      },
      {
        name: 'sonstiges',
        children: [
          { name: 'Powerbank' },
        ]
      },
    ]
  },
  {
    name: 'Restposten/Vorführgeräte'
  }
];


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface IProductConfig {
  viewMode: string;
  pcConfigMode: boolean;
}




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [egretAnimations]
})
export class ProductsComponent implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;
  @ViewChild('searchInput') private searchInput: MatInput;

  public productConfig: IProductConfig = {
    viewMode: 'grid-view',
    pcConfigMode: false
  };

  public nodeName: string;
  public nodeLink: string;
  public nodeId: number;

  public productConfig$: BehaviorSubject<IProductConfig> = new BehaviorSubject(this.productConfig);

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;
  treeControl = new FlatTreeControl<CatalogFlatNode>(
    node => node.level, node => node.expandable);

  private _transformer = (node: CatalogNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      nameLang: node.nameLang,
      parentID: node.parentID,
      link: node.link,
      level,

    };
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(
    public shopService: ShopService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private _layout: LayoutService,
    private oauthService: OAuthService,
    private cloudService: CloudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) {



    this.shopService.catalog$.subscribe((catalog: CatalogNode[]) => {
      // this.dataSource.data = TREE_DATA;
      console.log("TREE DATA");
      if (catalog.length !== 0) {
        this.dataSource.data = catalog;
        console.log(this.dataSource);
        console.log("Paramsss")
        if ((this.activatedRoute.snapshot.paramMap.keys.length == 0)) {
          // console.log('New Route Calculation...');
          // this.router.navigate(['/shop/catalog', catalog[0].id, catalog[0].name], {
          //   replaceUrl: true,
          //   // relativeTo: this.activatedRoute
          // });
        } else {
          console.log('Route alright...');
          this.nodeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
          this.nodeName = this.activatedRoute.snapshot.paramMap.get('name');
          this.nodeLink = catalog[0].link;
          // this.activatedRoute.snapshot.paramMap.get('link');
          // console.log(id, name);
          this.pageNo = 0;
          // alert(link);
          const params: HttpParams = new HttpParams().
            set('id', JSON.stringify(this.nodeId))
            .set('name', this.nodeName)
            .set('link', this.nodeLink)
            .set('sortBy', this.sortBy)
            .set('pageNo', JSON.stringify(this.pageNo ))
            .set('pageSize', JSON.stringify(this.pageSize))

          this.cloudService.getShopProducts(params).subscribe((response: ProductPage) => {
            // console.log(products);
            // console.log(products);
            const { products, totalItems } = response;
            this.count = totalItems;
            this.shopService.products$.next(products);
          }, (error) => {
            console.log(error);
          });
        }
      }
      // console.log(tree)
    });

    this.router.events.subscribe((routerEvent: RouterEvent) => {
      // console.log(routerEvent);
    });



    this.activatedRoute.queryParams.subscribe((params) => {
      const productID: string = params.productID;
      const name: string = params.category;
      const parentID: string = params.parentID;
      const nameLang: string = params.nameLang;
      const link: string = params.link;
      console.log(productID, name, parentID, nameLang, link);
      // this.cloudService.getShopProducts(productID, parentID, name, nameLang,link);
    });


    // this.shopService.products$.subscribe((products: Product[]) => {
    //   this.loader.close()

    // });
  }
  hasChild = (_: number, node: CatalogFlatNode) => node.expandable;

  ngOnInit() {
    this.cloudService.getCatalog().subscribe((catalog: CatalogNode[]) => {
      this.shopService.catalog$.next(catalog);
    });
    this.shopService.getProducts();
    this.buildFilterForm(this.shopService.initialFilters);
    this.categories$ = this.shopService.getCategories();
    this.getCart();
    this.cartData = this.shopService.cartData;
    // setTimeout(() => {
    // }, 1000);
  }
  ngOnDestroy() {

  }
  getCart() {
    this.shopService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
      });
  }
  addToCart(product) {
    const cartItem: CartItem = {
      product,
      data: {
        quantity: 1
      }
    };
    this.shopService
      .addToCart(cartItem)
      .subscribe(cart => {
        this.cart = cart;
        this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
      });
  }

  buildFilterForm(filterData: any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    });
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category);
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }

  setViewMode(viewMode: string) {
    if (viewMode !== this.productConfig.viewMode) {
      this.productConfig.viewMode = viewMode;
      this.productConfig$.next(this.productConfig);
    }
  }

  public setPcConfigMode(pcConfigMode: boolean) {
    if (pcConfigMode !== this.productConfig.pcConfigMode) {
      this.productConfig.pcConfigMode = pcConfigMode;
      this.productConfig$.next(this.productConfig);
    }
  }

  handleProductDescription(produktBeschreibung: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(produktBeschreibung);
  }


  sortBy: string = 'title';
  pageNo: number = 0;
  pageSize: number = 12;
  count: number = 0;

  submitSearchInput(input: string) {
    this.pageNo = 0;
    this.cloudService.getProductsByString(
      new HttpParams()
        .set('searchString', input)
        .set('sortBy', this.sortBy)
        .set('pageNo', JSON.stringify(this.pageNo))
        .set('pageSize', JSON.stringify(this.pageSize))
    ).subscribe((response: ProductPage) => {
      const { products, totalItems } = response;
      this.count = totalItems;
      this.shopService.products$.next(products);

    });
  }

  handlePageChange(pageNo: number, searchInput: string) {
    this.pageNo = pageNo;
   

      if(searchInput) {
        this.cloudService.getProductsByString(
          new HttpParams()
            .set('searchString', searchInput)
            .set('sortBy', this.sortBy)
            .set('pageNo', JSON.stringify(this.pageNo -1))
            .set('pageSize', JSON.stringify(this.pageSize))
        ).subscribe((response: ProductPage) => {
          const { products, totalItems } = response;
          this.count = totalItems;
          this.shopService.products$.next(products);
    
        });
        
      } else {
        const params: HttpParams = new HttpParams().
        set('id', JSON.stringify(this.nodeId))
        .set('name', this.nodeName)
        .set('link', this.nodeLink)
        .set('sortBy', this.sortBy)
        .set('pageNo', JSON.stringify(this.pageNo -1))
        .set('pageSize', JSON.stringify(this.pageSize))
        this.cloudService.getShopProducts(params).subscribe((response: ProductPage) => {
          const { products, totalItems } = response;
          this.count = totalItems;
          this.shopService.products$.next(products);
        }, (error) => {
          console.error(error);
        });

      }
  }

  isLtSm(): boolean {
    return this._layout.isLtSm();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }
  testApi() {
    this.cloudService.getHomeProducts().subscribe((data) => {
      console.log(data);
      alert('Received message');
    });
  }
  searchCatalogNode(node: CatalogNode, searchInput: MatInput) {
    // const queryParams: Params = { productID: node.id, category: node.name, parentID: node.parentID, name: node.name, nameLang: node.nameLang, link: node.link };
    this.pageNo = 0;
    this.nodeId = node.id;
    this.nodeName = node.name;
    this.nodeLink = node.link;
    searchInput.value = '';
    this.filterForm.controls['search'].setValue('');

    const params: HttpParams = new HttpParams().
      set('id', JSON.stringify(node.id))
      .set('name', node.name)
      .set('link', node.link)
      .set('sortBy', this.sortBy)
      .set('pageNo', JSON.stringify(this.pageNo ))
      .set('pageSize', JSON.stringify(this.pageSize))

    this.cloudService.getShopProducts(params).subscribe((response: ProductPage) => {
      const { products, totalItems } = response;
      this.count = totalItems;
      this.shopService.products$.next(products);
    }, (error) => {
      console.error(error);
    });
    //   this.router.navigate(
    //     [],
    //     {
    //       // relativeTo: this.activatedRoute,
    //       queryParams: queryParams,
    //       queryParamsHandling: 'merge', // remove to replace all query params by provided
    //     })
    //   // .then((completed) => {
    //   //   if(completed) {
    //   //     console.log('completed');
    //   //     const id: string = this.activatedRoute.snapshot.params['productID'];
    //   //     const parentID: string = this.activatedRoute.snapshot.paramMap.get('parentID');
    //   //     const name: string = this.activatedRoute.snapshot.paramMap.get('name')
    //   //     const nameLang: string =this.activatedRoute.snapshot.paramMap.get('nameLang')
    //   //     const link: string = this.activatedRoute.snapshot.paramMap.get('link');
    //   //     console.log(id);
    //   //   } else {
    //   //     console.error("Routing Error Occurred by Search Catalog Node Function");
    //   //   }
    //   // }).catch((error) => {
    //   //   console.error("Routing Error Occurred by Search Catalog Node Function");

    //   // });
  }
}
