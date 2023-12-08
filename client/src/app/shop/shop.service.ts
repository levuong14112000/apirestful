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
   getProducts(sortString :string, pageNumber: number, pageSize:number,typeId?:number,brandId?:number,search? : string) : Observable<IPagination | null> {
    let params = new HttpParams();
    if (typeId) {
      params = params.append('typeId',typeId.toString());
    }
    if (brandId) {
      params = params.append('brandId',brandId.toString());
    }
    if (search) {
      params = params.append('search',search);
    }
      params = params.append('sort',sortString.toString());
      params = params.append('pageNumber',pageNumber.toString());
      params = params.append('pageSize',pageSize.toString());
    
    return  this.http.get<IPagination>(this.baseUrl + 'products?pageSize=6',{params});
   }
   getBrands() {
    return this.http.get<Brands[]>(this.baseUrl + 'products/brands')
   }
   getTypes(){
    return this.http.get<Types[]>(this.baseUrl + 'products/types')
   }
  
}
