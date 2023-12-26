import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IBasketItem } from '../models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  faPlusCircle = faPlusCircle; faMinusCircle = faMinusCircle; faTrash= faTrash;
 constructor(public basketService : BasketService) {}
 incrementItemQuantity(item : IBasketItem){
  this.basketService.incrementItemQuantity(item);
 }
 decrementItemQuantity(item : IBasketItem){
  this.basketService.decrementItemQuantity(item);
 }
 removeItem(item : IBasketItem){
  this.basketService.removeItemFromBasket(item);
 }
}