import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/models/products';
import { faMinusCircle , faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product : IProduct | undefined ;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  quantity = 1;
  constructor (private basketService : BasketService,private activatedRoute : ActivatedRoute,private shopSevice : ShopService){
    
  }
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct(){
    // get product infomation from API
    // add (!) de chac chan la co params
    this.shopSevice.getProductById(+this.activatedRoute.snapshot.paramMap.get('id')!).subscribe(
      {
        next: (p) => {
          this.product = p;
        },
        error: (err) => {
          console.error(err);
        }
      }
    )

  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity > 1)
    this.quantity--;
  }
  // tham chieu tu basketservice
  addItemToBasket(){
    if (this.product && this.quantity > 0){
      this.basketService.addItemToBasket(this.product,this.quantity);
    }
  }
}
