import { Component, Input } from '@angular/core';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/models/products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  faCartShopping = faCartShopping;

  @Input() product: IProduct | undefined;


  constructor(private basketService: BasketService) {
  }

  addItemToBasket() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product);
    }
  }

}