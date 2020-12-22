import { Product } from './../../../shared/models/product.model';
import { ComponentConfiguration } from './../../../shared/models/component-configuration.model';
import { ComponentType } from './../../../shared/models/component-type.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { ShopService, CartItem } from '../shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Product } from '../../../shared/models/product.model';
import { Subscription } from 'rxjs';


const mockProducts1: Product[] = [
  {
    '_id': '5a9ae2106518248b68251fdf',
    'name': 'M & M Bestseller PC',
    // 'subtitle': 'Admodum assentior ad duo',
    'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte',
    'category': 'speaker',
    'tags': [
      'sunt',
      'sunt',
      'culpa'
    ],
    'price': {
      'sale': 32,
      'previous': 54
    },
    'ratings': {
      'rating': 3.86,
      'ratingCount': 26
    },
    'features': [
      'aliquip aliquip',
      'nulla laboris',
      'pariatur consequat'
    ],
    'photo': '../../../../assets/images/mm-pc.jpg',
    'gallery': [
      '../../../../assets/images/mm-pc.jpg',
      '../../../../assets/images/mm-pc2.jpg'
    ],
    'badge': {
      'text': '20% off',
      'color': '#B3E0F9'
    }
  },
  {
    '_id': '5a9ae210b7b4d3ad2f048bbe',
    'name': 'M & M Computer Professional PC',
    // 'subtitle': 'Admodum assentior ad duo',
    'description': 'cillum eiusmod',
    'category': 'speaker',
    'tags': [
      'Lorem',
      'nisi',
      'ad'
    ],
    'price': {
      'sale': 25,
      'previous': 43
    },
    'ratings': {
      'rating': 3.72,
      'ratingCount': 18
    },
    'features': [
      'magna est',
      'consectetur dolor',
      'est proident'
    ],
    'photo': '../../../../assets/images/mm-pc2.jpg',
    'gallery': [
      '../../../../assets/images/mm-pc2.jpg',
      '../../../../assets/images/mm-pc3.jpg'
    ],
    'badge': {
      'text': 'Sale',
      'color': '#B3E0F9'
    }
  },
  {
    '_id': '5a9ae210d9a8d6dda7256417',
    'name': 'M & M Mini PCs',
    // 'subtitle': 'On-ear fit to minimize noise so you can hear every beat',
    'description': 'sit laborum',
    'category': 'headphone',
    'tags': [
      'eu',
      'irure',
      'proident'
    ],
    'price': {
      'sale': 29,
      'previous': 55
    },
    'ratings': {
      'rating': 3.79,
      'ratingCount': 77
    },
    'features': [
      'laboris id',
      'magna eu',
      'sint quis'
    ],
    'photo': '../../../../assets/images/mm-pc3.jpg',
    'gallery': [
      '../../../../assets/images/products/headphone-1.jpg',
      '../../../../assets/images/products/headphone-2.jpg',
      '../../../../assets/images/products/headphone-3.jpg',
      '../../../../assets/images/products/headphone-4.jpg'
    ],
    'badge': {
      'text': '-40%',
      'color': '#B3E0F9'
    }
  },
]

const mockProducts2: Product[] = [
  {
    '_id': '5a9ae210e8329237332e56d7',
    'name': 'M & M Professional PC',
    'description': 'eiusmod elit',
    'category': 'watch',
    'tags': [
      'laborum',
      'minim',
      'tempor'
    ],
    'price': {
      'sale': 33,
      'previous': 58
    },
    'ratings': {
      'rating': 4.74,
      'ratingCount': 64
    },
    'features': [
      'cillum ullamco',
      'ad minim',
      'duis exercitation'
    ],
    'photo': '../../../../assets/images/mm-pc4.jpg',
    'gallery': [
      '../../../../assets/images/products/watch-1.jpg',
      '../../../../assets/images/products/watch-2.jpg'
    ],
    'badge': {
      'text': '',
      'color': 'red'
    }
  },
  {
    '_id': '5a9ae210cb9937d28c6eca1a',
    'name': 'M & M Mini PCs',
    'description': 'dolore tempor',
    'category': 'watch',
    'tags': [
      'Lorem',
      'dolor',
      'duis'
    ],
    'price': {
      'sale': 38,
      'previous': 50
    },
    'ratings': {
      'rating': 4.43,
      'ratingCount': 98
    },
    'features': [
      'aliquip consequat',
      'excepteur non',
      'aliquip eu'
    ],
    'photo': '../../../../assets/images/mm-pc.jpg',
    'gallery': [
      '../../../../assets/images/products/watch-1.jpg',
      '../../../../assets/images/products/watch-2.jpg'
    ],
    'badge': {
      'text': '',
      'color': 'red'
    }
  },
]


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: egretAnimations
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public productID;
  public product: Product;
  public quantity: number = 1;
  public cart: CartItem[];
  public cartData: any;
  private productSub: Subscription;
  public cpus: string[] = ['Ryzen 5 2600X', 'Ryzen 5 2600', 'Ryzen 7 2700', 'Ryzen 5 3600', 'Ryzen 7 2700X', 'Ryzen 7 3700X'];
  public graphicCards: string[] = ['GTX 1650 4GB', 'GTX 1660S 6GB', 'RTX 2060 6GB', 'RTX 2060 Super'];
  public ssds: string[] = ['256GB SSD M.2', '500GB SSD M.2', '1TB SSD M.2', 'Option 2'];
  public selectedCPU: string;
  public selectedGraphicCard: string;
  public selectedSSD: string;
  public selectedHDD: string;
  public isConfigurationOpen = false;




  public mockedIntegratedComponents: Map<ComponentType, ComponentConfiguration> = new Map<ComponentType, ComponentConfiguration>([
    [
      ComponentType.CPU,
      new ComponentConfiguration(
        'CPU',
        mockProducts1,
        1,
        1,
        mockProducts1,
        'anderen',
        'cpu'
      )
    ],
    [
      ComponentType.GraphicsCard,
      new ComponentConfiguration(
        'Grafikkarte',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'graphics_card'
      )
    ],
    [
      ComponentType.SSD,
      new ComponentConfiguration(
        'SSD',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'ssd'
      )
    ],
    [
      ComponentType.HDD,
      new ComponentConfiguration(
        'HDD',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'hdd'
      )
    ],
    [
      ComponentType.Mainboard,
      new ComponentConfiguration(
        'Mainboard',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'anderes',
        'motherboard'
      )
    ],
    [
      ComponentType.RAM,
      new ComponentConfiguration(
        'RAM',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'anderen',
        'ram'
      )
    ],
    [
      ComponentType.Soundcard,
      new ComponentConfiguration(
        'Soundkarte',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'sound_card'
      )
    ],
    [
      ComponentType.Networkcard,
      new ComponentConfiguration(
        'Netzwerkkarte',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'network_card'
      )
    ],
    [
      ComponentType.Case,
      new ComponentConfiguration(
        'Gehäuse',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'anderes',
        'case'
      )
    ],
    [
      ComponentType.Keyboard,
      new ComponentConfiguration(
        'Tastatur',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'keyboard'
      )
    ],
    [
      ComponentType.Mouse,
      new ComponentConfiguration(
        'Maus',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'mouse'
      )
    ],
    [
      ComponentType.OperatingSystem,
      new ComponentConfiguration(
        'Betriebssystem',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'anderes',
        'operating_system'

      )
    ],
    [
      ComponentType.Software,
      new ComponentConfiguration(
        'Software',
        mockProducts2,
        1,
        1,
        mockProducts2,
        'andere',
        'software'
      )
    ],
  ]);

  public photoGallery: any[] = [{ url: '', state: '0' }];
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productID = this.route.snapshot.params['id'];
    this.getProduct(this.productID);
    this.getCart();
    this.cartData = this.shopService.cartData;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

  getProduct(id) {
    this.productSub = this.shopService.getProductDetails(id)
      .subscribe(res => {
        this.product = res;
        this.initGallery(this.product)
      }, err => {
        this.product = {
          _id: '',
          name: '',
          price: { sale: 0 }
        };
      })
  }
  getCart() {
    this.shopService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
      })
  }
  addToCart() {
    let cartItem: CartItem = {
      product: this.product,
      data: {
        quantity: this.quantity,
        options: {}
      }
    };

    this.shopService
      .addToCart(cartItem)
      .subscribe(res => {
        this.cart = res;
        this.quantity = 1;
        this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
      })
  }

  initGallery(product: Product) {
    if (!product.gallery) {
      return;
    }
    this.photoGallery = product.gallery.map(i => {
      return {
        url: i,
        state: '0'
      }
    });
    if (this.photoGallery[0]) {
      this.photoGallery[0].state = '1';
    }
  }
  changeState(photo) {
    if (photo.state === '1') {
      return;
    }
    this.photoGallery = this.photoGallery.map(p => {
      if (photo.url === p.url) {
        setTimeout(() => {
          p.state = '1';
          return p;
        }, 290)
      }
      p.state = '0';
      return p;
    })
  }

  toggleConfiguration(): void {
    this.isConfigurationOpen = !this.isConfigurationOpen;
  }

}
