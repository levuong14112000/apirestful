import { Injectable } from '@angular/core';
import { Basket, IBasket, IBasketItem } from '../models/basket';
import { IProduct } from '../models/products';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/environments/enviroment';
import { BasePortalHost } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket : IBasket | undefined
  baseUrl = enviroment.apiUrl;
  
  constructor(private http : HttpClient) {}
  addItemToBasket(item : IProduct , quantity = 1){
    var itemToAdd : IBasketItem = {
      id : item.id,
      productName : item.name,
      price : item.price,
      pictureUrl : item.pictureUrl,
      quantity : quantity,
      brand : item.productBrand,
      type : item.productType
    }
     this.basket = this.getCurrentBasket() ?? this.createNewBasket()
   var index = this.basket.items.findIndex(i => i.id == itemToAdd.id);
   if ( index === -1){
    this.basket.items.push(itemToAdd);
   }
   else{
    this.basket.items[index].quantity += quantity;
   }
   this.setBasket(this.basket);
  }

  getCurrentBasket() {
    return this.basket
  }
  setBasket(basket : IBasket){
    return this.http.post<IBasket>(this.baseUrl + 'basket',basket).subscribe({
      next : (response) => {this.basket = response; console.log(response)},
      error : (err) => console.log(err)
    });
  }
   createNewBasket() : IBasket{
    const basket = new Basket();
    localStorage.setItem('basket_id',basket.id)
    return basket;
  } 
  getBasketItems(id : string) {
    return this.http.get<IBasket>(this.baseUrl + "basket" + "?id="  + id).pipe(
      map ((result : IBasket) => this.basket = result)
    );
  }
}
