import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Brands } from '../models/brands';
import { Types } from '../models/types';
import { IProduct } from '../models/products';
import { IPagination } from '../models/IPagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faRefresh = faRefresh ; faSearch = faSearch;
  productList: IProduct[] = [];
  typeIdSelectd : number = 0;
  brandList : Brands[] | undefined;
  typeList : Types[] | undefined;
  constructor(private shopService : ShopService){
 
  }
  ngOnInit(): void {
    this.loadProduct();
    this.loadBrand();
    this.loadType();
  }

  loadProduct(){
    /// observable
    this.shopService.getProducts(this.typeIdSelectd).subscribe({
   //try
    next: (response : IPagination | null) => {
        this.productList = response!.data
      },
    //catch
      error: err => console.log(err)
    });
  }

  loadBrand(){
    this.shopService.getBrands().subscribe({
      next: response => {
        this.brandList = response;
      },
  
      error: err => console.log(err)
    });
  }
  loadType(){
    this.shopService.getTypes().subscribe({
      next: response => {
        this.typeList = response;
      },
  
      error: err => console.log(err)
    })
  }
  // onSelectProductType(typeId : number){
  //   this.typeIdSelectd = typeId ;
  //   this.loadProduct();
  // }

  onSelectProductType(typeId : number){
    this.typeIdSelectd = typeId ;
    this.loadProduct();
  }
}
