import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';



@NgModule({
  // khai báo
  declarations: [
    ShopComponent
  ],
  // import thư viện
  imports: [
    CommonModule
  ],
  // xuất thư viện
  exports : [
    ShopComponent
  ]
})
export class ShopModule { }
