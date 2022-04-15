import { ProductPage } from './../models/product-page.model';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  private SAMPLEPOOL_API = 'http://localhost:9090/api/web';
  private homeProductsUrl = this.SAMPLEPOOL_API + '/home-products';
  private catalogUrl = this.SAMPLEPOOL_API + '/catalog';
  private shopProductsUrl = this.SAMPLEPOOL_API + '/shop';
  private getProdudctUrl = this.SAMPLEPOOL_API + '/get-product';
  private getProductsByStringUrl = this.SAMPLEPOOL_API + '/get-products-by-string'

  constructor(private httpClient: HttpClient, private httpService: HttpService) { }
  
  getHomeProducts(): Observable<any> {
    return this.httpClient.get(this.homeProductsUrl);
  }
  
  
  getCatalog(): Observable<any> {    
    return this.httpClient.get(this.catalogUrl);
  }
  
  getShopProducts(params: HttpParams): Observable<ProductPage> {
    // const formData: FormData = new FormData();
     
    // formData.append('id', id);
    // formData.append('name', name);
    // formData.append('link', link);
    return this.httpClient.get(this.shopProductsUrl, {params: params}).pipe(map((productPage) => productPage as ProductPage));
  }

  getProduct(artikelNummer: number): Observable<Product> {
    return this.httpClient.get(this.getProdudctUrl + '/' + artikelNummer).pipe(map(product => product as Product));
  }

  getProductsByString(params: HttpParams): Observable<ProductPage> {
    return this.httpClient.get(this.getProductsByStringUrl, { params: params}).pipe(map((products) => products as ProductPage));
  }



}
