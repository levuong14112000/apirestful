import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { IProduct } from '../models/products';
import { Brands } from '../models/brands';
import { Types } from '../models/types';
import { ShopService } from '../shop/shop.service';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  faRefresh = faRefresh ; faSearch = faSearch;
  // ViewChild lay value id (#search) trong html
  @ViewChild('search',) searchElement : ElementRef | undefined;
  picture = ""
  search = "";
  productList: IProduct[] = [];
  typeIdSelectd : number = 0;
  brandIdSelected : number = 0;
  brandList : Brands[] | undefined;
  typeList : Types[] | undefined;
  pageNumber = 1 ;
  pageSize = 3;
  totalCount = 0;
  sortSelected = 'name';
  sortList = [
  {name: 'Alphabet', value: 'name'}
  ,{name : 'Price : Low to High' ,value : 'priceAsc'}
  ,{name : 'Price : High to Low', value :'priceDesc'}]
  deleteId? : number;
  message?: string;
  
  ngOnInit(): void {
    this.loadProduct();
  }
  constructor(private shopService : ShopService) {
    
    
  }
  Delete(id : number) {
    if (id){
      this.shopService.deleteProduct(id).subscribe({
        next: () => {
          this.deleteId = undefined
          this.loadProduct()
        },
        error: (err : any) => {
          console.log(err)
        }
      })
    }
  }
  onSearch(){
    this.search = this.searchElement?.nativeElement.value;
    this.loadProduct();
   }
   onReset(){
     this.search = "";
     this.searchElement!.nativeElement.value = '';
     this.typeIdSelectd  = 0;
     this.brandIdSelected = 0;
     this.pageNumber = 1 ;
     this.pageSize = 6;
     this.totalCount = 0;
     this.sortSelected = 'name';
     this.loadProduct();
   }
  onPageChanged(eventEmittedNumber : number){
    this.pageNumber = eventEmittedNumber;
    this.loadProduct();
  }
  loadProduct(){
    /// observable
    this.shopService.getProducts(this.sortSelected,this.pageNumber
      ,this.pageSize,this.typeIdSelectd,this.brandIdSelected,
      this.search).subscribe({
   //try
    next: (response : IPagination | null) => {
        this.productList = response!.data
        this.totalCount = response!.totalCount
        this.pageNumber = response!.pageNumber
        this.pageSize = response!.pageSize
      },
    //catch
      error: (err: any) => console.log(err)
    });
  }
}
