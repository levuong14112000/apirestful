import { Injectable } from '@angular/core';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../models/basket';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { enviroment } from 'src/environments/enviroment';
import { IProduct } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = enviroment.apiUrl;
  basket: IBasket = ({id: '', items: []});
  basketTotal : IBasketTotal = ({
    shipping : 0 ,
    subtotal : 0 ,
    total : 0
  })

  constructor(private http: HttpClient) { }

  addItemToBasket(item: IProduct, quantity = 1) {
    let itemToAdd: IBasketItem = {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType
    };

    this.basket = (this.basket.id === '')
                          ? this.createNewBasket()
                          : this.basket;

    var index = this.basket.items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      this.basket.items.push(itemToAdd);
    } else {
      this.basket.items[index].quantity += quantity;
    }

    this.setBasket(this.basket);
  }


  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe({
      next: (response) => {
        console.log(response);
        this.basket = response; 
        this.calculateTotals();
      },
      error: (err) => console.log(err)
    });
  }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((result: IBasket) => {
          this.basket = result;
           console.log(result);
           this.calculateTotals();
          })
      );
  }


  private createNewBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  incrementItemQuantity(item : IBasketItem){
    let bk = {...this.basket};
    let index = bk.items.findIndex(i => i.id === item.id);
    bk.items[index].quantity++;
    this.setBasket(bk);
  }
  decrementItemQuantity(item : IBasketItem){
    let bk = {...this.basket};
    let index = bk.items.findIndex(i => i.id === item.id);
    if (bk.items[index].quantity < 1){
      bk.items[index].quantity--;
    }else{
      this.removeItemFromBasket(item);
    }
    this.setBasket(bk);
  }
  removeItemFromBasket(item : IBasketItem){
    let bk = {...this.basket};
    if(bk.items.some(x => x.id === item.id)){
      bk.items = bk.items.filter(i => i.id !== item.id);
      if(this.basket.items.length > 0)
      {
        this.setBasket(this.basket);
      }
      else{
        this.deleteBasket(bk);    
      }
    }
  }
  deleteBasket(basket : IBasket){

  }

  private calculateTotals(){
      let basket = this.basket;
      let Shipping = 0;
      let Subtotal = basket.items.reduce((sum,item)=>
        (item.price * item.quantity) + sum ,0
      )
      let Total = Subtotal + Shipping;
      this.basketTotal = ({shipping : Shipping , subtotal : Subtotal , total : Total})
  }
}