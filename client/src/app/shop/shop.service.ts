import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPagination } from '../models/IPagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../models/products';
import { Brands } from '../models/brands';
import { Types } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "http://localhost:8080/api/";
  constructor(private http : HttpClient) {
    }
   getProducts(typeId?:number) : Observable<IPagination | null> {
    let params = new HttpParams();
    if (typeId) {
      params = params.append('typeId',typeId.toString());
    }
    return  this.http.get<IPagination>(this.baseUrl + 'products?pageSize=6',{params});
   }
   getBrands() {
    return this.http.get<Brands[]>(this.baseUrl + 'products/brands')
   }
   getTypes(){
    return this.http.get<Types[]>(this.baseUrl + 'products/types')
   }
  
}
