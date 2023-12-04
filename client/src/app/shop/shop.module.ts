import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductItemComponent } from './product-item/product-item.component';



@NgModule({
  // khai báo
  declarations: [
    ShopComponent,
    ProductItemComponent
  ],
  // import thư viện
  imports: [
    CommonModule,
    FontAwesomeModule

  ],
  // xuất thư viện
  exports : [
    ShopComponent
  ]
})
export class ShopModule { }
