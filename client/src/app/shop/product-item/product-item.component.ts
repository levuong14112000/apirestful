import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']

})
// truyen du lieu tu cha "shop" lay IProduct
export class ProductItemComponent {
  faCartShopping = faCartShopping;
  @Input() product : IProduct | undefined;
}
