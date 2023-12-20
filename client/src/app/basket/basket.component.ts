import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { faMinusCircle, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  faPlusCircle = faPlusCircle; faMinusCircle = faMinusCircle; faTrash= faTrash;
 constructor(public basketService : BasketService) {
   
  
 }
}