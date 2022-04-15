import { CloudService } from './../../shared/services/cloud.service';
// throwErrorasobservableThrowError,
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductDB } from '../../shared/inmemory-db/products';
import { CountryDB } from '../../shared/inmemory-db/countries';
import { Product } from '../../shared/models/product.model';
import { FormGroup } from '@angular/forms';

import { of, combineLatest } from 'rxjs';
import { startWith, debounceTime, delay, map, switchMap } from 'rxjs/operators';
import { CatalogNode } from 'app/shared/models/catalog-node.model';



export interface CartItem {
  product: Product;
  data: {
    quantity: number,
    options?: any
  };
}

export interface CartData {
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public products: Product[] = [];
  public products$: Subject<Product[]> = new Subject<Product[]>();
  public catalog$: Subject<CatalogNode[]> = new Subject<CatalogNode[]>();
  public catalog: CatalogNode[] = [];
  public cartData$: BehaviorSubject<CartData> = new BehaviorSubject<CartData>({itemCount: 0});

  public initialFilters = {
    minPrice: 10,
    maxPrice: 40,
    minRating: 1,
    maxRating: 5
  };

  public cart: CartItem[] = [];
  public cartData: CartData = {
    itemCount: 0
  }
  
  constructor(private cloudService: CloudService) { 
    // this.cloudService.getCatalog().subscribe((data) => {
    //   console.log(data);
    // }, (error) => {
    //   console.error(error);
    // });
    this.catalog$.next(this.catalog);
  }


  public getCart(): Observable<CartItem[]> {
    return of(this.cart)
  }
  public addToCart(cartItem: CartItem): Observable<CartItem[]> {
    let index = -1;
    this.cart.forEach((item, i) => {
      if(item.product.artikelNummer === cartItem.product.artikelNummer) {
        index = i;
      }
    })
    if(index !== -1) {
      this.cart[index].data.quantity += cartItem.data.quantity;
      this.updateCount();
      

      return of(this.cart)
    } else {
      this.cart.push(cartItem);
      this.updateCount();
      
      return of(this.cart)
    }
  }
  private updateCount() {
    alert('UpdateCount');
    this.cartData.itemCount = 0;
    this.cart.forEach(item => {
      this.cartData.itemCount += item.data.quantity;
      this.cartData$.next(this.cartData);
    });
  }
  public removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    this.cart = this.cart.filter(item => {
      if(item.product.artikelNummer == cartItem.product.artikelNummer) {
        return false;
      }
      return true;
    });
    this.updateCount();
    return of(this.cart)
  }
  // public getProducts(): Observable<Product[]> {
  //   let productDB = new ProductDB();
  //   return of(productDB.products)
  //     .pipe(
  //       delay(500),
  //       map((data: Product[]) => {
  //         this.products = data;
  //         return data;
  //       })
  //     )
  // }

  public getProducts(): void {
    this.cloudService.getHomeProducts().subscribe((products) => {
      this.products = products.products as Product[];
      this.products.forEach((product) => {
        product.gallery = ['assets/images/mm-pc.jpg', 'assets/images/mm-pc2.jpg'];
        product.photo = 'assets/images/mm-pc2.jpg';
        console.log(product);
      });
      this.products$.next(this.products);
    });
  }


  public getProductDetails(artikelNummer: number): Product {
    let test = artikelNummer;
    // let productDB = new ProductDB();
    let product: Product = this.products.filter(p => {
      let bool: boolean = JSON.stringify(p.artikelNummer) === JSON.stringify(artikelNummer)
      return bool;
    }
      )[0];
    if(!product) {
      // return observableThrowError(new Error('Product not found!'));
    }
    return product;
  }
  public getCategories(): Observable<any> {
    let categories = ['speaker', 'headphone', 'watch', 'phone'];
    return of(categories);
  }

  public getFilteredProduct(filterForm: FormGroup): Observable<Product[]> {
    return combineLatest(
      this.products,
      filterForm.valueChanges
      .pipe(
        startWith(this.initialFilters),
        debounceTime(400)
      )
    )
    .pipe(
      switchMap(([products, filterData]) => {
        //product
        return this.filterProducts(this.products, filterData);
      })
    )

  }
  /*
  * If your data set is too big this may raise performance issue.
  * You should implement server side filtering instead.
  */ 
  private filterProducts(products: Product[], filterData): Observable<Product[]> {
    let filteredProducts = products.filter(p => {
      let isMatch: Boolean;
      let match = {
        search: false,
        caterory: false,
        price: false,
        rating: false
      };
      // Search
      if (
        !filterData.search
        || p.name.toLowerCase().indexOf(filterData.search.toLowerCase()) > -1
        || p.name.indexOf(filterData.search) > -1
        || p.beschreibung.indexOf(filterData.search) > -1
      ) {
        match.search = true;
      } else {
        match.search = false;
      }
      // Category filter
      if (
        filterData.category === p.produktGruppe 
        || !filterData.category 
        || filterData.category === 'all'
      ) {
        match.caterory = true;
      } else {
        match.caterory = false;
      }
      // Price filter
      if (
        p.preis >= filterData.minPrice 
        && p.preis <= filterData.maxPrice
      ) {
        match.price = true;
      } else {
        match.price = false;
      }
      // Rating filter
      // if(
      //   p.ratings.rating >= filterData.minRating 
      //   && p.ratings.rating <= filterData.maxRating
      // ) {
      //   match.rating = true;
      // } else {
      //   match.rating = false;
      // }
      
      for(let m in match) {
        if(!match[m]) return false;
      }

      return true;
    })
    return of(filteredProducts)
  }
}
