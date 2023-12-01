import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../models/IPagination';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "http://localhost:8080/api/";
  constructor(private http : HttpClient) {
    }
   getProducts() : Observable<IPagination>{
    return  this.http.get<IPagination>(this.baseUrl + 'products?pageSize=6')

   }
}
