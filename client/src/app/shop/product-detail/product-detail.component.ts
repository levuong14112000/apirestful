import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/models/products';
import { faMinusCircle , faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product : IProduct | undefined ;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  constructor (private activatedRoute : ActivatedRoute,private shopSevice : ShopService){

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
}
