import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  // ViewChild lay value id (#search) trong html
  @ViewChild('search',) searchElement : ElementRef | undefined;
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
  constructor(private shopService : ShopService){
  
  }
  ngOnInit(): void {
    this.loadProduct();
    this.loadBrand();
    this.loadType();
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
      error: err => console.log(err)
    });
  }

  loadBrand(){
    this.shopService.getBrands().subscribe({
      next: response => this.brandList = [{id : 0 , name : 'All'}, ...response],
      error: err => console.log(err)
      
    });
  }
  loadType(){
    this.shopService.getTypes().subscribe({
      next: response => this.typeList = [{id : 0 , name : 'All'}, ...response],
  
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
  onSelectProductBrand(brandId : number){
    this.brandIdSelected = brandId ;
    this.loadProduct();
  }
  onSortSelect(event : Event){
    this.sortSelected =  (<HTMLSelectElement> event.target).value;
    console.log(this.sortSelected);
    this.loadProduct();
  }
//   onPageChanged(event : any){
    
//     this.pageNumber = event.page;
//     this.loadProduct();
//   }
  onPageChanged(eventEmittedNumber : number){
    this.pageNumber = eventEmittedNumber;
    this.loadProduct();
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
}
