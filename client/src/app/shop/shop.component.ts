import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  faRefresh = faRefresh ; faSearch = faSearch;
  productList: any[] = [];
  constructor(private shopService : ShopService){
  }
  ngOnInit(): void {
    this.callApi();
  }
  callApi(){
    /// observable
    this.shopService.getProducts().subscribe({
   //try
    next: response => {
        this.productList = response.data
      },
    //catch
      error: err => console.log(err)
    });
  }
}
