import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']

})
// truyen du lieu tu cha "shop" lay IProduct
export class ProductItemComponent {
  faCartShopping = faCartShopping;
  @Input() product : IProduct | undefined;
  constructor(private basketService : BasketService) {
  }
  addItemToBasket(){
    if (this.product){
      this.basketService.addItemToBasket(this.product);
    }
  }
}
